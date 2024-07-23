import { EngineBase } from '@/base';
import { 状态本地持久化管理器模块 } from '@/modules/状态本地持久化管理器模块';

export class 基础引擎 extends EngineBase {
  providerModules() {
    super.providerModules(new 状态本地持久化管理器模块(this));
  }

  updateState() {}

  getState() {}

  protected async onLaunch(): Promise<void> {
    // const asyncStateManager = this.getModule(AsyncStateManager);
  }
}
