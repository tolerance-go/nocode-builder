import { EngineBase, ModuleBase } from '@/base';
import { authPathnames, localKeys } from '@/common/constants';
import { delay } from '@/common/utils';
import { 全局事件系统 } from '@/modules/全局事件系统';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  compareTrees,
} from '@/modules/界面状态管理器模块';
import { last } from 'lodash-es';
import { 历史记录 } from '../项目树历史纪录管理者/types';

export interface SyncHistoryManagerState {
  historyA: 历史记录[];
  historyB: 历史记录[];
  pendingUpdate: 历史记录[] | null;
}

interface SyncHistoryManagerEmployeeParams {
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

export class 历史记录远程同步管理者 extends ModuleBase {
  private currentPathname: string | null = null;
  private readonly retryStartCallback: RetryStartCallback; // 初始重试回调函数
  private readonly retryFailCallback: RetryFailCallback; // 重试失败回调函数
  private readonly syncFunction: SyncFunction; // 同步函数
  private retryCount = 0;
  private maxRetryCount = 3;
  private 历史记录远程同步状态机;
  private stateController;

  constructor(engine: EngineBase, params: SyncHistoryManagerEmployeeParams) {
    super(engine);

    const { retryStartCallback, retryFailCallback, syncFunction } = params;

    // const restoredStateValue = this.engine
    //   .getDependEngine(基础引擎)
    //   .getLocalStateItem<
    //     历史记录远程同步状态机SnapshotType['value']
    //   >(localKeys.历史记录远程同步管理者_state_value);

    // if (restoredStateValue) {
    //   const resolvedState = 历史记录远程同步状态机.resolveState({
    //     value: restoredStateValue,
    //   });
    //   this.历史记录远程同步状态机 = createActor(历史记录远程同步状态机, {
    //     snapshot: resolvedState,
    //   });
    // } else {
    //   this.历史记录远程同步状态机 = createActor(历史记录远程同步状态机);
    // }

    // const initialState = 引擎api.getLocalStateItem<SyncHistoryManagerState>(
    //   localKeys.历史记录远程同步管理者_state,
    // ) || {
    //   historyA: [],
    //   historyB: [],
    //   pendingUpdate: null,
    // };

    // this.stateController = new StateController({
    //   initialState,
    // });

    this.retryStartCallback = retryStartCallback;
    this.retryFailCallback = retryFailCallback;
    this.syncFunction = syncFunction;
  }

  get 当前同步状态() {
    return this.历史记录远程同步状态机.getSnapshot().value;
  }

  public requireModules() {
    super.requireModules(this.engine.getModuleOrCreate(全局事件系统));
  }

  public async updateHistories(newHistory: 历史记录[]): Promise<void> {
    const state = this.stateController.getState();
    if (this.当前同步状态是否为同步中()) {
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

  async onSetup(): Promise<void> {
    this.历史记录远程同步状态机.start().subscribe(() => {
      this.引擎api.setLocalStateItem(
        localKeys.历史记录远程同步管理者_state_value,
        this.历史记录远程同步状态机.getSnapshot().value,
      );
    });

    this.stateController.subscribe(() => {
      this.引擎api.setLocalStateItem(
        localKeys.历史记录远程同步管理者_state,
        this.stateController.getState(),
      );
    });

    this.getDependModule(全局事件系统).on(
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

  protected async onStart(): Promise<void> {
    const 当前的同步状态是同步中 = this.当前同步状态是否为同步中();

    if (当前的同步状态是同步中) {
      // 则继续开始同步
      this.startSync();
    }
  }

  // 接受新的历史记录数组，并更新 A 和 B

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
  private async startSync(): Promise<void> {
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

  private 当前同步状态是否为同步中(): boolean {
    return typeof this.当前同步状态 === 'object'
      ? !!this.当前同步状态.同步中
      : false;
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

  private async 检查同步状态并启动() {
    const state = this.stateController.getState();
    if (this.当前同步状态 === '同步已失败') {
      await this.retrySync();
    } else if (this.当前同步状态 === '待机' && state.historyB.length > 0) {
      await this.startSync();
    }
  }
}

export * from './utils';
