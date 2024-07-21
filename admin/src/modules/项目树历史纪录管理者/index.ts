import { ModuleBase } from '@/base';
import { api, 全局事件系统实例, 全局界面通知系统实例 } from '@/globals';
import { createBrowserInspector } from '@statelyai/inspect';
import { createActor } from 'xstate';
import {
  DiffResult,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from '../UIStoreManager';
import { 历史状态机 } from './states';
import { 历史记录 } from './types';
import { 全局事件系统 } from '../全局事件系统';
import { 界面通知系统 } from '../界面通知系统';
import {
  历史记录远程同步管理者,
  convertDiffResultToProjectDiffDto,
} from '../历史记录远程同步管理者';

export class 项目树历史纪录管理者 extends ModuleBase {
  retryFailCallback = () => {};

  retryStartCallback = () => {
    this.getDependModule(界面通知系统).showModal({
      type: 'info',
      title: '正在保存服务器数据...',
      onOk: () => {},
      // okButtonProps: {
      //   loading: true,
      // },
    });
  };

  private 历史指针: number = -1;
  private 历史堆栈: 历史记录[] = [];
  private 历史状态机Actor;

  public constructor() {
    super();

    this.历史状态机Actor = createActor(历史状态机, {
      inspect:
        window.Cypress || import.meta.env.PROD
          ? undefined
          : createBrowserInspector().inspect,
      input: {
        历史堆栈: this.历史堆栈,
        历史指针: this.历史指针,
      },
    });
  }

  requireModules() {
    super.requireModules(
      全局界面通知系统实例,
      全局事件系统实例,
      new 历史记录远程同步管理者({
        retryStartCallback: this.retryStartCallback,
        retryFailCallback: this.retryFailCallback,
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
      }),
    );
  }

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '推入历史记录',
      data: record,
    });
  }
  protected async onSetup(): Promise<void> {
    this.历史状态机Actor.start().subscribe((state) => {
      if (this.历史指针 !== state.context.历史指针) {
        this.getDependModule(全局事件系统).emit(
          '项目树历史记录管理者/指针移动',
          {
            历史指针: state.context.历史指针,
            历史堆栈: state.context.历史堆栈,
          },
        );
      }

      this.历史堆栈 = state.context.历史堆栈;
      this.历史指针 = state.context.历史指针;

      this.getDependModule(历史记录远程同步管理者).updateHistories(
        this.历史堆栈,
      );
    });

    this.getDependModule(全局事件系统).on(
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

    this.getDependModule(全局事件系统).on(
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

    this.getDependModule(全局事件系统).on(
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

    this.getDependModule(全局事件系统).on(
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

    this.getDependModule(全局事件系统).on(
      '界面视图管理者/用户撤销项目树',
      () => {
        this.历史状态机Actor.send({
          type: '撤销请求',
        });
      },
    );

    this.getDependModule(全局事件系统).on(
      '界面视图管理者/用户重做项目树',
      () => {
        this.历史状态机Actor.send({
          type: '重做请求',
        });
      },
    );
  }
}

export * from './states';
