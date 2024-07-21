import { EngineBase } from '@/base';
import { UITreeManager } from '@/modules/managers';
import { BaseEngine } from './BaseEngine';

export class AppEngine extends EngineBase {
  requireEngines() {
    super.requireEngines(new BaseEngine());
  }

  providerModules() {
    super.providerModules(new UITreeManager());
  }
}
