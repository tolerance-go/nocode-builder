import { ManagerBase } from '@/core/base';
import { 全局事件系统 } from '@/core/systems';
import { authPathnames, localKeys } from '@/common/constants';
import { last } from 'lodash-es';
import {
  compareTrees,
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '@/core/managers/UIStoreManager';
import { 历史记录 } from '../../types';
import { createActor } from 'xstate';
import {
  历史记录远程同步状态机,
  历史记录远程同步状态机ActorType,
  历史记录远程同步状态机SnapshotType,
} from './machines';
import { StateController } from '@/common/controllers';
import { delay } from '@/common/utils';
import localforage from 'localforage';

export interface SyncHistoryManagerState {
  historyA: 历史记录[];
  historyB: 历史记录[];
  pendingUpdate: 历史记录[] | null;
}

interface SyncHistoryManagerEmployeeParams {
  initialHistoryA: 历史记录[];
  initialHistoryB: 历史记录[];
  retryStartCallback: RetryStartCallback;
  retryFailCallback: RetryFailCallback;
  syncFunction: SyncFunction;
}

type RetryStartCallback = () => void;
type RetryFailCallback = () => void;
type SyncFunction = (
  differences: DiffResult<ProjectStructureTreeDataNode>,
  oldTreeDataRecord?: ProjectTreeNodeDataRecord,
  newTreeDataRecord?: ProjectTreeNodeDataRecord,
) => Promise<void>;

export class 历史记录远程同步管理者 extends ManagerBase {
  private currentPathname: string | null = null;

  private readonly retryStartCallback: RetryStartCallback; // 初始重试回调函数
  private readonly retryFailCallback: RetryFailCallback; // 重试失败回调函数
  private readonly syncFunction: SyncFunction; // 同步函数
  private retryCount = 0;
  private maxRetryCount = 3;
  private _历史记录远程同步状态机: 历史记录远程同步状态机ActorType | null =
    null;
  private stateController;

  get 历史记录远程同步状态机(): 历史记录远程同步状态机ActorType {
    if (!this._历史记录远程同步状态机) {
      throw new Error('历史记录远程同步状态机未初始化');
    }

    return this._历史记录远程同步状态机;
  }

  get 当前同步状态() {
    return this.历史记录远程同步状态机.getSnapshot().value;
  }

  requires(全局事件系统实例: 全局事件系统): this {
    return super.requireActors(全局事件系统实例);
  }

  constructor(params: SyncHistoryManagerEmployeeParams) {
    super();
    const {
      initialHistoryA,
      initialHistoryB,
      retryStartCallback,
      retryFailCallback,
      syncFunction,
    } = params;

    this.stateController = new StateController({
      initialState: {
        historyA: initialHistoryA,
        historyB: initialHistoryB,
        pendingUpdate: null as 历史记录[] | null,
      },
      saveStateFunction: async (state) => {
        await localforage.setItem(
          localKeys.历史记录远程同步管理者_state,
          state,
        );
      },
      loadStateFunction: async () => {
        return await localforage.getItem(
          localKeys.历史记录远程同步管理者_state,
        );
      },
    });

    this.retryStartCallback = retryStartCallback;
    this.retryFailCallback = retryFailCallback;
    this.syncFunction = syncFunction;
  }

  async onSetup(): Promise<void> {
    await this.stateController.loadState();

    const restoredStateValue = await localforage.getItem<
      历史记录远程同步状态机SnapshotType['value']
    >(localKeys.历史记录远程同步管理者_state_value);

    if (restoredStateValue) {
      const resolvedState = 历史记录远程同步状态机.resolveState({
        value: restoredStateValue,
      });
      this._历史记录远程同步状态机 = createActor(历史记录远程同步状态机, {
        snapshot: resolvedState,
      });
    } else {
      this._历史记录远程同步状态机 = createActor(历史记录远程同步状态机);
    }

    this.历史记录远程同步状态机.start();

    this.requireActor(全局事件系统).on(
      '界面状态管理者/路由更新',
      async ({ pathname }) => {
        const prevPathname = this.currentPathname;

        if (prevPathname) {
          if (prevPathname !== pathname) {
            // 从授权页面进入系统页面
            if (
              Object.values(authPathnames).includes(prevPathname) &&
              !Object.values(authPathnames).includes(pathname)
            ) {
              await this.检查同步状态并启动();
            }

            // 从系统页面进入授权页面
            if (
              !Object.values(authPathnames).includes(prevPathname) &&
              Object.values(authPathnames).includes(pathname)
            ) {
              /* empty */
            }
          }
        } else {
          // 首次进入系统页面
          if (Object.values(authPathnames).includes(pathname)) {
            /* empty */
          } else {
            await this.检查同步状态并启动();
          }
        }

        this.currentPathname = pathname;
      },
    );
  }

  // 比较 historyA 和 historyB 的差异
  private compareHistories() {
    const state = this.stateController.getState();

    const lastA = last(state.historyA);
    const lastB = last(state.historyB);

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
    this.历史记录远程同步状态机.send({
      type: '开始同步',
    });
    try {
      await this.syncFunction(
        results.diffResults,
        results.oldTreeDataRecord,
        results.newTreeDataRecord,
      );
      await this.commitPendingUpdate();
      this.历史记录远程同步状态机.send({
        type: '同步成功',
      });
    } catch (error) {
      this.历史记录远程同步状态机.send({
        type: '同步失败',
      });
      if (this.retryCount < this.maxRetryCount) {
        this.retryCount++;
        this.历史记录远程同步状态机.send({
          type: '开始重试',
        });
        if (this.retryCount === 1) {
          this.retryStartCallback();
        }
        await delay(1000);
        await this.startSync();
      } else {
        this.历史记录远程同步状态机.send({
          type: '重试失败',
        });
        this.retryFailCallback();
      }
    }
  }

  // 提交待更新的历史记录
  private async commitPendingUpdate(): Promise<void> {
    const state = this.stateController.getState();
    if (state.pendingUpdate) {
      this.stateController.updateState({
        historyA: state.historyB,
        historyB: state.pendingUpdate,
        pendingUpdate: null,
      });
      await this.startSync();
    } else {
      this.stateController.updateState({ historyA: state.historyB });
    }
  }

  private 当前是否为同步状态(): boolean {
    return typeof this.当前同步状态 === 'object'
      ? !!this.当前同步状态.同步中
      : false;
  }

  private async startSync(): Promise<void> {
    if (this.当前是否为同步状态()) {
      await this.sync();
    }
  }

  private async retrySync() {
    const state = this.stateController.getState();
    if (state.pendingUpdate) {
      this.stateController.updateState({
        historyB: state.pendingUpdate,
        pendingUpdate: null,
      });
    }
    await this.startSync();
  }

  // 接受新的历史记录数组，并更新 A 和 B
  public async updateHistories(newHistory: 历史记录[]): Promise<void> {
    const state = this.stateController.getState();
    if (this.当前是否为同步状态()) {
      this.stateController.updateState({ pendingUpdate: newHistory });
    } else if (this.当前同步状态 === '同步已失败') {
      this.stateController.updateState({ historyB: newHistory });
      await this.startSync();
    } else {
      this.stateController.updateState({
        historyA: state.historyB,
        historyB: newHistory,
      });
      await this.startSync();
    }
  }

  async 检查同步状态并启动() {
    const state = this.stateController.getState();
    if (this.当前同步状态 === '同步已失败') {
      await this.retrySync();
    } else if (this.当前同步状态 === '待机' && state.historyB.length > 0) {
      await this.startSync();
    }
  }
}
