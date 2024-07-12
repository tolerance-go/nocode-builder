import { Manager } from '@/types';
import { createActor } from 'xstate';
import { 历史状态机, 历史记录 } from './actors';
import { 全局事件系统 } from '@/core/systems/全局事件系统';
import { createBrowserInspector } from '@statelyai/inspect';
const { inspect } = createBrowserInspector();

export class 项目树历史纪录管理者 implements Manager {
  public 全局事件系统实例;
  历史状态机Actor = createActor(历史状态机, {
    inspect,
    input: {
      历史堆栈: [],
      历史指针: -1,
    },
  });

  public constructor(全局事件系统实例: 全局事件系统) {
    this.全局事件系统实例 = 全局事件系统实例;
    this.历史状态机Actor.start();
  }

  async work() {
    this.全局事件系统实例.on(
      '界面状态管理者/插入新节点',
      ({ nodeKey, parentKey, nodeData, treeSnapshot, index }) => {
        this.历史状态机Actor.send({
          type: '推入历史记录',
          data: {
            state: treeSnapshot,
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
  }

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '推入历史记录',
      data: record,
    });
  }
}
