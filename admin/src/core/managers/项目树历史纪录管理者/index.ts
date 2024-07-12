import { Manager } from '@/types';
import { createActor } from 'xstate';
import { UIStoreManager } from '../UIStoreManager';
import { 历史状态机, 历史记录 } from './actors';

export class 项目树历史纪录管理者 implements Manager {
  历史状态机Actor = createActor(历史状态机, {
    input: {
      历史堆栈: [],
      历史指针: -1,
    },
  });

  public constructor() {
    this.历史状态机Actor.start();
  }

  async work(界面状态管理者实例: UIStoreManager) {
    界面状态管理者实例;
  }

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '更新历史',
      state: record,
    });
  }
}
