import { EngineBase } from '@/base';
import { AsyncStateManager } from '@/modules/AsyncStateManager';

export class 基础引擎 extends EngineBase {
  providerModules() {
    super.providerModules(new AsyncStateManager(this));
  }

  updateState() {}

  getState() {}

  protected async onLaunch(): Promise<void> {
    const asyncStateManager = this.getModule(AsyncStateManager);
  }
}
