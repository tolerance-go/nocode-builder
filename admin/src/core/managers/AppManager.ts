import { documentEnv } from '@/core/envs';
import { UITreeManager } from './UITreeManager';

export class AppManager {
  private static instance: AppManager | undefined;

  private constructor() {}

  public static getInstance(): AppManager {
    if (!this.instance) {
      this.instance = new AppManager();
    }
    return this.instance;
  }

  work() {
    documentEnv.emitter.on('pageLoadComplete', () => {
      UITreeManager.getInstance().work();
    });
  }
}
