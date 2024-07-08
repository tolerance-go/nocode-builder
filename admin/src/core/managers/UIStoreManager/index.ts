import { Manager } from '@/types';
import { reduxStore } from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';

export class UIStoreManager implements Manager {
  private static instance: UIStoreManager | undefined;

  private constructor() {}

  public static getInstance(): UIStoreManager {
    if (!this.instance) {
      this.instance = new UIStoreManager();
    }
    return this.instance;
  }

  work() {
    projectTreeOnWork(reduxStore);
  }
}

export * from './store';
export * from './hooks';
