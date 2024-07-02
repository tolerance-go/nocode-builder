import '@/i18n'; // 引入 i18n 配置
import { System } from '@/types';

export class InternationalizationSystem implements System {
  private static instance: InternationalizationSystem | undefined;

  private constructor() {}

  public static getInstance(): InternationalizationSystem {
    if (!this.instance) {
      this.instance = new InternationalizationSystem();
    }
    return this.instance;
  }

  public launch(): void {
    // 启动逻辑
  }
}
