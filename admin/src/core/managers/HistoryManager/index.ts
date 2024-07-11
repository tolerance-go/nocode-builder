import { Manager } from '@/types';
import { 历史状态机, 历史记录 } from './actors';
import { createActor } from 'xstate';

export class HistoryManager implements Manager {
  private static instance: HistoryManager | undefined;

  public static getInstance(): HistoryManager {
    if (!this.instance) {
      this.instance = new HistoryManager();
    }
    return this.instance;
  }

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
