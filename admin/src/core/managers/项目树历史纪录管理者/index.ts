import { Manager } from '@/types';
import { 历史状态机, 历史记录 } from './actors';
import { createActor } from 'xstate';
import Emittery from 'emittery';

interface HistoryManagerEvents {}

export class 项目树历史纪录管理者 implements Manager {
  private static instance: 项目树历史纪录管理者 | undefined;

  public static getInstance(): 项目树历史纪录管理者 {
    if (!this.instance) {
      this.instance = new 项目树历史纪录管理者();
    }
    return this.instance;
  }

  public emitter = new Emittery<HistoryManagerEvents>();

  历史状态机Actor = createActor(历史状态机, {
    input: {
      历史堆栈: [],
      历史指针: -1,
    },
  });

  private constructor() {
    this.历史状态机Actor.start();
  }

  work(): void {}

  addRecordToHistory(record: 历史记录) {
    this.历史状态机Actor.send({
      type: '更新历史',
      state: record,
    });
  }
}
