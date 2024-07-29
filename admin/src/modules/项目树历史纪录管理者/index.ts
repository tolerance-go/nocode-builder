import { EngineBase, ModuleBase } from '@/base';
import { createActor } from 'xstate';
import { 事件中心系统 } from '../事件中心系统';
// import { 历史记录远程同步管理者 } from '../历史记录远程同步管理者';
import { 界面通知系统 } from '../界面通知系统';
import { 历史状态机 } from './states';
import { 历史记录 } from './types';

export class 项目树历史纪录管理者 extends ModuleBase {
  private static instance: 项目树历史纪录管理者;

  public static getInstance(engine: EngineBase): 项目树历史纪录管理者 {
    if (!项目树历史纪录管理者.instance) {
      项目树历史纪录管理者.instance = new 项目树历史纪录管理者(engine);
    }

    return 项目树历史纪录管理者.instance;
  }

  private 历史指针: number = -1;
  private 历史堆栈: 历史记录[] = [];
  private 历史状态机Actor;

  constructor(engine: EngineBase) {
    super(engine);

    this.历史状态机Actor = createActor(历史状态机, {
      // inspect:
      //   window.Cypress || import.meta.env.PROD
      //     ? undefined
      //     : createBrowserInspector().inspect,
      input: {
        历史堆栈: this.历史堆栈,
        历史指针: this.历史指针,
      },
    });
  }

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '推入历史记录',
      data: record,
    });
  }

  protected requireModules() {
    super.requireModules(
      界面通知系统.getInstance(this.engine),
      事件中心系统.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {
    this.历史状态机Actor.start().subscribe((state) => {
      if (this.历史指针 !== state.context.历史指针) {
        this.getDependModule(事件中心系统).emit(
          '项目树历史记录管理者/指针移动',
          {
            历史指针: state.context.历史指针,
            历史堆栈: state.context.历史堆栈,
          },
        );
      }

      this.历史堆栈 = state.context.历史堆栈;
      this.历史指针 = state.context.历史指针;

      // this.getDependModule(历史记录远程同步管理者).updateHistories(
      //   this.历史堆栈,
      // );
    });

    this.getDependModule(事件中心系统).on(
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

    this.getDependModule(事件中心系统).on(
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

    this.getDependModule(事件中心系统).on(
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

    this.getDependModule(事件中心系统).on(
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

    this.getDependModule(事件中心系统).on(
      '界面视图管理者/用户撤销项目树',
      () => {
        this.历史状态机Actor.send({
          type: '撤销请求',
        });
      },
    );

    this.getDependModule(事件中心系统).on(
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
