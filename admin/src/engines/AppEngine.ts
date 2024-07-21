import { EngineBase } from '@/base';
import { BaseEngine } from './BaseEngine';
import { UITreeManager } from '@/modules/UITreeManager';

export class AppEngine extends EngineBase {
  requireEngines() {
    super.requireEngines(new BaseEngine());
  }

  providerModules() {
    super.providerModules(new UITreeManager());
  }
}
