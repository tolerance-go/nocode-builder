import { System } from '@/types';

export class UIStoreSystem implements System {
  private static instance: UIStoreSystem | undefined;

  private constructor() {}

  public static getInstance(): UIStoreSystem {
    if (!this.instance) {
      this.instance = new UIStoreSystem();
    }
    return this.instance;
  }

  public launch(): void {
    // 启动逻辑
  }
}
