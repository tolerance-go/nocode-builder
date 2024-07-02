import { Manager } from '@/types';
import { HistoryRecord, historyMachineActor } from './actors';

export class HistoryManager implements Manager {
  private static instance: HistoryManager | undefined;

  public static getInstance(): HistoryManager {
    if (!this.instance) {
      this.instance = new HistoryManager();
    }
    return this.instance;
  }

  private constructor() {
    historyMachineActor.start();
  }

  work(): void {}

  addRecordToHistory(record: HistoryRecord) {
    historyMachineActor.send({
      type: 'UPDATE_HISTORY',
      state: record,
    });
  }
}
