import { Manager } from '@/types';
import { createActor } from 'xstate';
import { 历史状态机, 历史记录 } from './actors';
import { 全局事件系统 } from '@/core/systems/全局事件系统';
import { createBrowserInspector } from '@statelyai/inspect';
const { inspect } = createBrowserInspector();

export class 项目树历史纪录管理者 implements Manager {
  public 全局事件系统实例;

  private 历史指针: number = -1;

  历史状态机Actor = createActor(历史状态机, {
    inspect,
    input: {
      历史堆栈: [],
      历史指针: this.历史指针,
    },
  });

  public constructor(全局事件系统实例: 全局事件系统) {
    this.全局事件系统实例 = 全局事件系统实例;
    this.历史状态机Actor.start();
    this.历史状态机Actor.subscribe((state) => {
      if (this.历史指针 !== state.context.历史指针) {
        this.全局事件系统实例.emit('项目树历史记录管理者/指针移动', {
          历史指针: state.context.历史指针,
          历史堆栈: state.context.历史堆栈,
        });
      }

      this.历史指针 = state.context.历史指针;
    });
  }

  async work() {
    this.全局事件系统实例.on(
      '界面状态管理者/插入新节点',
      ({ nodeKey, parentKey, nodeData, treeNodes, treeDataRecord, index }) => {
        this.历史状态机Actor.send({
          type: '推入历史记录',
          data: {
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

export * from './actors';
