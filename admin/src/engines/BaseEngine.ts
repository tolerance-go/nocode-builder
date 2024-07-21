import { EngineBase } from '@/base';
import { AsyncStateController } from '@/common/controllers/AsyncStateController';

export class BaseEngine extends EngineBase {
  providerModules() {
    super.providerModules(new AsyncStateController());
  }

  protected async onLaunch(): Promise<void> {
    const asyncStateController = this.getModule(AsyncStateController);
  }

  updateState() {}

  getState() {}
}
