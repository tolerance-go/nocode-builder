import { EngineBase } from '@/base';
import { 基础引擎 } from './基础引擎';
import { UITreeManager } from '@/modules/UITreeManager';

export class 应用引擎 extends EngineBase {
  requireEngines() {
    super.requireEngines(new 基础引擎());
  }

  providerModules() {
    super.providerModules(new UITreeManager());
  }
}
