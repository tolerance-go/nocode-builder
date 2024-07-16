import { authPathnames, localKeys, paths } from '@/configs';
import { 全局事件系统 } from '@/core/systems/全局事件系统';
import { 界面通知系统 } from '@/core/systems/界面通知系统';
import { api } from '@/globals';
import { Manager } from '@/types';
import { createBrowserInspector } from '@statelyai/inspect';
import localforage from 'localforage';
import { createActor } from 'xstate';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../UIStoreManager';
import { SyncHistoryManagerEmployee } from './employees/SyncHistoryManagerEmployee';
import { convertDiffResultToProjectDiffDto } from './employees/utils';
import { 历史状态机, 历史记录 } from './machines';

export class 项目树历史纪录管理者 implements Manager {
  private working: boolean = false;

  public 全局事件系统实例;

  public 界面通知系统实例;

  private 历史指针: number = -1;

  private 历史堆栈: 历史记录[] = [];

  private 历史状态机Actor;

  private syncHistoryManagerEmployee: SyncHistoryManagerEmployee;

  public constructor(
    全局事件系统实例: 全局事件系统,
    界面通知系统实例: 界面通知系统,
  ) {
    this.界面通知系统实例 = 界面通知系统实例;

    this.syncHistoryManagerEmployee = new SyncHistoryManagerEmployee({
      initialHistoryA: [],
      initialHistoryB: [],
      retryCallback: (startSync) => {
        this.界面通知系统实例.showModal({
          type: 'confirm',
          title: '同步失败，是否重试？',
          onOk: () => {
            startSync();
          },
        });
      },
      syncFunction: async (
        differences: DiffResult<ProjectStructureTreeDataNode>,
        oldTreeDataRecord?: ProjectTreeNodeDataRecord,
        newTreeDataRecord?: ProjectTreeNodeDataRecord,
      ) => {
        await api.syncs.applyProjectDiff(
          convertDiffResultToProjectDiffDto(
            differences,
            oldTreeDataRecord,
            newTreeDataRecord,
          ),
        );
      },
      saveStateFunction: async (state) => {
        await localforage.setItem(
          localKeys.syncHistoryManagerEmployee_state,
          state,
        );
      },
      loadStateFunction: async () => {
        return await localforage.getItem(
          localKeys.syncHistoryManagerEmployee_state,
        );
      },
    });

    this.全局事件系统实例 = 全局事件系统实例;
    this.历史状态机Actor = createActor(历史状态机, {
      inspect: window.Cypress ? undefined : createBrowserInspector().inspect,
      input: {
        历史堆栈: this.历史堆栈,
        历史指针: this.历史指针,
      },
    });
  }

  async work() {
    this.历史状态机Actor.start();

    this.注册监听();

    this.全局事件系统实例.on('界面状态管理者/路由更新', ({ pathname }) => {
      if (!Object.values(authPathnames).includes(pathname)) {
        if (this.syncHistoryManagerEmployee.isWorking() === false) {
          this.syncHistoryManagerEmployee.work();
        }
      }
    });

    this.working = true;
  }

  isWorking(): boolean {
    return this.working;
  }

  注册监听() {
    this.历史状态机Actor.subscribe((state) => {
      if (this.历史指针 !== state.context.历史指针) {
        this.全局事件系统实例.emit('项目树历史记录管理者/指针移动', {
          历史指针: state.context.历史指针,
          历史堆栈: state.context.历史堆栈,
        });
      }

      this.历史堆栈 = state.context.历史堆栈;
      this.历史指针 = state.context.历史指针;

      this.syncHistoryManagerEmployee.updateHistories(this.历史堆栈);
    });

    this.全局事件系统实例.on(
      '界面状态管理者/新增节点',
      ({ nodeKey, parentKey, nodeData, treeNodes, treeDataRecord, index }) => {
        this.addRecordToHistory({
          createTime: Date.now(),
          state: {
            treeNodes,
            treeDataRecord,
          },
          操作: {
            type: '插入',
            detail: {
              节点key: nodeKey,
              父节点key: parentKey,
              index,
              recordItem: nodeData,
            },
          },
        });
      },
    );

    this.全局事件系统实例.on(
      '界面状态管理者/修改节点',
      ({
        nodeKey,
        newTreeNodeData,
        oldTreeNodeData,
        treeNodes,
        treeDataRecord,
      }) => {
        this.addRecordToHistory({
          createTime: Date.now(),
          state: {
            treeNodes,
            treeDataRecord,
          },
          操作: {
            type: '更新',
            detail: {
              节点key: nodeKey,
              oldRecordItem: oldTreeNodeData,
              newRecordItem: newTreeNodeData,
            },
          },
        });
      },
    );

    this.全局事件系统实例.on(
      '界面状态管理者/删除节点',
      ({ nodeKeys, treeNodes, treeDataRecord }) => {
        this.addRecordToHistory({
          createTime: Date.now(),
          state: {
            treeNodes,
            treeDataRecord,
          },
          操作: {
            type: '删除',
            detail: {
              节点keys: nodeKeys,
            },
          },
        });
      },
    );

    this.全局事件系统实例.on(
      '界面状态管理者/移动节点',
      ({ 节点keys, 目标父节点key, index, treeNodes, treeDataRecord }) => {
        this.addRecordToHistory({
          createTime: Date.now(),
          state: {
            treeNodes,
            treeDataRecord,
          },
          操作: {
            type: '移动',
            detail: {
              节点keys,
              目标父节点key,
              index,
            },
          },
        });
      },
    );

    this.全局事件系统实例.on('界面视图管理者/用户撤销项目树', () => {
      this.历史状态机Actor.send({
        type: '撤销请求',
      });
    });

    this.全局事件系统实例.on('界面视图管理者/用户重做项目树', () => {
      this.历史状态机Actor.send({
        type: '重做请求',
      });
    });
  }

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '推入历史记录',
      data: record,
    });
  }
}

export * from './machines';
