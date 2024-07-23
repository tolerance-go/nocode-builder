import { EngineBase } from '@/base';
import { 基础引擎 } from './基础引擎';
import { 界面组件树管理模块 } from '@/modules/界面组件树管理模块';

export class 应用引擎 extends EngineBase {
  requireEngines() {
    super.requireEngines(new 基础引擎(this.engineManager));
  }

  providerModules() {
    super.providerModules(new 界面组件树管理模块(this));
  }
}
