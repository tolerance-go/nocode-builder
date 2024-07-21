import { EngineBase } from '@/base';
import { EngineManager } from '@/base/EngineManager';
import { UITreeManager } from '@/modules/managers';
import { BaseEngine } from './BaseEngine';

export class AppEngine extends EngineBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_engineManager: EngineManager) {
    super();
  }

  requireEngines() {
    super.requireEngines(new BaseEngine());
  }

  providerModules() {
    super.providerModules((engine) => new UITreeManager(engine));
  }
}
