import { api } from '@/globals';
import { last } from 'lodash-es';
import localforage from 'localforage';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../../UIStoreManager';
import { 历史记录 } from '../machines';
import { convertDiffResultToProjectDiffDto } from './utils';

interface SyncHistoryManagerState {
  historyA: 历史记录[];
  historyB: 历史记录[];
  pendingUpdate: 历史记录[] | null;
  syncStatus: '未同步' | '已同步' | '同步失败' | '同步中';
}

export class SyncHistoryManagerEmployee {
  private state: SyncHistoryManagerState = {
    historyA: [],
    historyB: [],
    pendingUpdate: null,
    syncStatus: '未同步',
  };
  private retryCount: number = 0; // 重试计数
  private readonly maxRetries: number = 3; // 最大重试次数
  private readonly retryDelay: number = 1000; // 重试延迟时间，单位为毫秒

  constructor(initialHistoryA: 历史记录[], initialHistoryB: 历史记录[]) {
    this.state.historyA = initialHistoryA;
    this.state.historyB = initialHistoryB;
  }

  private async saveStateToStorage(): Promise<void> {
    await localforage.setItem('syncHistoryManagerEmployee_state', this.state);
  }

  private async loadStateFromStorage(): Promise<void> {
    const state: SyncHistoryManagerState | null = await localforage.getItem(
      'syncHistoryManagerEmployee_state',
    );
    if (state) {
      this.state = state;
    }
  }

  private async updateState(
    updates: Partial<SyncHistoryManagerState>,
  ): Promise<void> {
    this.state = { ...this.state, ...updates };
    await this.saveStateToStorage();
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

  // 同步差异到远程数据库
  private async syncDifferences(
    differences: DiffResult<ProjectStructureTreeDataNode>,
    oldTreeDataRecord?: ProjectTreeNodeDataRecord,
    newTreeDataRecord?: ProjectTreeNodeDataRecord,
  ): Promise<void> {
    // 实现你的同步逻辑，例如通过 API 请求发送差异数据到远程数据库
    await api.syncs.applyProjectDiff(
      convertDiffResultToProjectDiffDto(
        differences,
        oldTreeDataRecord,
        newTreeDataRecord,
      ),
    );
  }

  // 执行同步操作
  private async sync(): Promise<void> {
    const results = this.compareHistories();
    await this.updateState({ syncStatus: '同步中' });
    try {
      await this.syncDifferences(
        results.diffResults,
        results.oldTreeDataRecord,
        results.newTreeDataRecord,
      );
      await this.updateState({ syncStatus: '已同步' });
      this.retryCount = 0; // 重置重试计数
      await this.commitPendingUpdate();
    } catch (error) {
      await this.updateState({ syncStatus: '同步失败' });
      await this.handleSyncError();
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

  private async handleSyncError(): Promise<void> {
    if (this.state.pendingUpdate) {
      await this.updateState({
        historyB: this.state.pendingUpdate,
        pendingUpdate: null,
      });
    }
    this.retrySync();
  }

  private async startSync(): Promise<void> {
    if (this.state.syncStatus !== '同步中') {
      await this.sync();
    }
  }

  private retrySync() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      setTimeout(() => {
        this.startSync();
      }, this.retryDelay);
    } else {
      throw new Error(`同步失败超过最大重试次数：${this.maxRetries}`);
    }
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public async updateHistories(newHistory: 历史记录[]): Promise<void> {
    if (this.state.syncStatus === '同步中') {
      await this.updateState({ pendingUpdate: newHistory });
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
    await this.loadStateFromStorage();
    if (this.state.syncStatus === '同步失败') {
      this.retrySync();
    } else if (
      this.state.syncStatus === '未同步' &&
      this.state.historyB.length > 0
    ) {
      await this.startSync();
    }
  }
}
