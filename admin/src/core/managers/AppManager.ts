import { Manager } from '@/types';
import { DocumentEnv } from '../envs';
import { UITreeManager } from './UITreeManager';
import { UIStoreManager } from './UIStoreManager';
import { I18nSystem } from '../systems';

export class AppManager implements Manager {
  private static instance: AppManager | undefined;

  private constructor() {}

  public static getInstance(): AppManager {
    if (!this.instance) {
      this.instance = new AppManager();
    }
    return this.instance;
  }

  work() {
    DocumentEnv.getInstance().initialize(document, (instance) => {
      instance.emitter.on('pageLoadComplete', () => {
        UITreeManager.getInstance().work();
      });
    });
    I18nSystem.getInstance().launch();

    UIStoreManager.getInstance().work();
  }
}
