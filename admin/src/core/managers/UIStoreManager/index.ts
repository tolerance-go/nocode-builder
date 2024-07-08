import { Manager } from '@/types';
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
    projectTreeOnWork();
  }
}

export * from './store';
export * from './hooks';
