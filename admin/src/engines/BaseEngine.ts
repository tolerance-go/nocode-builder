import { EngineBase } from '@/base';
import { AsyncStateManager } from '@/modules/managers';

export class BaseEngine extends EngineBase {
  providerModules() {
    super.providerModules(new AsyncStateManager());
  }

  protected async onLaunch(): Promise<void> {
    const asyncStateManager = this.getModule(AsyncStateManager);
  }

  updateState() {}

  getState() {}
}
