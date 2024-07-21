import { EngineBase } from '@/base';
import { AsyncStateManager } from '@/modules/AsyncStateManager';

export class BaseEngine extends EngineBase {
  providerModules() {
    super.providerModules(new AsyncStateManager());
  }

  updateState() {}

  getState() {}

  protected async onLaunch(): Promise<void> {
    const asyncStateManager = this.getModule(AsyncStateManager);
  }
}
