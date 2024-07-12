import { Manager } from '@/types';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';
import * as store from './store';
import * as hooks from './hooks';
import * as utils from './store/utils';

export class UIStoreManager implements Manager {
  private static instance: UIStoreManager | undefined;

  private constructor() {}

  public static getInstance(): UIStoreManager {
    if (!this.instance) {
      this.instance = new UIStoreManager();
    }
    return this.instance;
  }

  public store = store;

  public hooks = hooks;

  public utils = utils;

  work() {
    projectTreeOnWork();
  }
}

export * from './store';
