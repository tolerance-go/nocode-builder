import { Manager } from '@/types';
import { DocumentEnv } from '../envs';
import { UITreeManager } from './UITreeManager';

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
    DocumentEnv.getInstance().emitter.on('pageLoadComplete', () => {
      UITreeManager.getInstance().work();
    });
  }
}
