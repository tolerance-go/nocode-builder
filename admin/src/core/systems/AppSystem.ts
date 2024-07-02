import { System } from '@/types';

export class AppSystem implements System {
  private static instance: AppSystem | undefined;

  private constructor() {}

  public static getInstance(): AppSystem {
    if (!this.instance) {
      this.instance = new AppSystem();
    }
    return this.instance;
  }

  public launch(): void {
    // 启动逻辑
  }
}
