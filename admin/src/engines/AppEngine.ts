import { EngineBase } from '@/base';
import { UITreeManager } from '@/modules/managers';
import { BaseEngine } from './BaseEngine';
import { EngineManager } from '@/base/EngineManager';

export class AppEngine extends EngineBase {
  private engineManager: EngineManager;

  constructor(engineManager: EngineManager) {
    super();
    this.engineManager = engineManager;
  }

  requireEngines() {
    super.requireEngines(new BaseEngine());
  }

  providerModules() {
    super.providerModules(
      (engine) => new UITreeManager(this.engineManager, engine),
    );
  }
}
