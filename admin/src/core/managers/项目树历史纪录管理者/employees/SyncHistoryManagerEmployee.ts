import { Manager } from '@/types';
import { last } from 'lodash-es';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../UIStoreManager';
import { 历史记录 } from '../machines';

export interface SyncHistoryManagerState {
  historyA: 历史记录[];
  historyB: 历史记录[];
  pendingUpdate: 历史记录[] | null;
  syncStatus: '未同步' | '已同步' | '同步失败' | '同步中';
}

interface SyncHistoryManagerEmployeeParams {
  initialHistoryA: 历史记录[];
  initialHistoryB: 历史记录[];
  retryCallback: RetryCallback;
  syncFunction: SyncFunction;
  saveStateFunction: (state: SyncHistoryManagerState) => Promise<void>;
  loadStateFunction: () => Promise<SyncHistoryManagerState | null>;
}

type RetryCallback = (retry: () => void) => void;
type SyncFunction = (
  differences: DiffResult<ProjectStructureTreeDataNode>,
  oldTreeDataRecord?: ProjectTreeNodeDataRecord,
  newTreeDataRecord?: ProjectTreeNodeDataRecord,
) => Promise<void>;

export class SyncHistoryManagerEmployee implements Manager {
  private state: SyncHistoryManagerState = {
    historyA: [],
    historyB: [],
    pendingUpdate: null,
    syncStatus: '未同步',
  };
  private readonly retryCallback: RetryCallback; // 重试回调函数
  private readonly syncFunction: SyncFunction; // 同步函数
  private readonly saveStateFunction: (
    state: SyncHistoryManagerState,
  ) => Promise<void>; // 持久化函数
  private readonly loadStateFunction: () => Promise<SyncHistoryManagerState | null>; // 加载持久化状态函数

  constructor(params: SyncHistoryManagerEmployeeParams) {
    const {
      initialHistoryA,
      initialHistoryB,
      retryCallback,
      syncFunction,
      saveStateFunction,
      loadStateFunction,
    } = params;
    this.state.historyA = initialHistoryA;
    this.state.historyB = initialHistoryB;
    this.retryCallback = retryCallback;
    this.syncFunction = syncFunction;
    this.saveStateFunction = saveStateFunction;
    this.loadStateFunction = loadStateFunction;
  }

  private async updateState(
    updates: Partial<SyncHistoryManagerState>,
  ): Promise<void> {
    this.state = { ...this.state, ...updates };
    await this.saveStateFunction(this.state);
  }

  private async loadState(): Promise<void> {
    const state: SyncHistoryManagerState | null =
      await this.loadStateFunction();
    if (state) {
      this.state = state;
    }
  }

  // 比较 historyA 和 historyB 的差异
  private compareHistories() {
    const lastA = last(this.state.historyA);
    const lastB = last(this.state.historyB);

    const results = compareTrees<ProjectStructureTreeDataNode>(
      lastA?.state.treeNodes ?? [],
      lastB?.state.treeNodes ?? [],
      (oldNode, newNode) => {
        return (
          lastA?.state.treeDataRecord[oldNode.key].title !==
          lastB?.state.treeDataRecord[newNode.key].title
        );
      },
    );

    return {
      diffResults: results,
      oldTreeDataRecord: lastA?.state.treeDataRecord,
      newTreeDataRecord: lastB?.state.treeDataRecord,
    };
  }

  // 执行同步操作
  private async sync(): Promise<void> {
    const results = this.compareHistories();
    await this.updateState({ syncStatus: '同步中' });
    try {
      await this.syncFunction(
        results.diffResults,
        results.oldTreeDataRecord,
        results.newTreeDataRecord,
      );
      await this.updateState({ syncStatus: '已同步' });
      await this.commitPendingUpdate();
    } catch (error) {
      await this.updateState({ syncStatus: '同步失败' });
      await this.retrySync();
    }
  }

  // 提交待更新的历史记录
  private async commitPendingUpdate(): Promise<void> {
    if (this.state.pendingUpdate) {
      await this.updateState({
        historyA: this.state.historyB,
        historyB: this.state.pendingUpdate,
        pendingUpdate: null,
      });
      await this.startSync();
    } else {
      await this.updateState({ historyA: this.state.historyB });
    }
  }

  private async startSync(): Promise<void> {
    if (this.state.syncStatus !== '同步中') {
      await this.sync();
    }
  }

  private async retrySync() {
    if (this.state.pendingUpdate) {
      await this.updateState({
        historyB: this.state.pendingUpdate,
        pendingUpdate: null,
      });
    }
    this.retryCallback(this.startSync.bind(this));
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public async updateHistories(newHistory: 历史记录[]): Promise<void> {
    if (this.state.syncStatus === '同步中') {
      await this.updateState({ pendingUpdate: newHistory });
    } else if (this.state.syncStatus === '同步失败') {
      await this.updateState({ historyB: newHistory });
      await this.startSync();
    } else {
      await this.updateState({
        historyA: this.state.historyB,
        historyB: newHistory,
      });
      await this.startSync();
    }
  }

  // 执行同步任务
  public async work(): Promise<void> {
    await this.loadState();
    if (this.state.syncStatus === '同步失败') {
      await this.retrySync();
    } else if (
      this.state.syncStatus === '未同步' &&
      this.state.historyB.length > 0
    ) {
      await this.startSync();
    }
  }
}
