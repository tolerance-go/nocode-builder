import { Manager } from '@/types';
import { 历史状态机Actor, 历史记录 } from './actors';

export class HistoryManager implements Manager {
  private static instance: HistoryManager | undefined;

  public static getInstance(): HistoryManager {
    if (!this.instance) {
      this.instance = new HistoryManager();
    }
    return this.instance;
  }

  private constructor() {
    历史状态机Actor.start();
  }

  work(): void {}

  addRecordToHistory(record: 历史记录) {
    历史状态机Actor.send({
      type: '更新历史',
      state: record,
    });
  }
}
