import { EngineBase } from '@/base';
import { 基础引擎 } from './基础引擎';
import { 界面组件树管理模块 } from '@/modules/界面组件树管理模块';
import { 项目树后台同步模块 } from '@/modules/项目树后台同步模块';

export class 应用引擎 extends EngineBase {
  requireEngines() {
    super.requireEngines(new 基础引擎(this.engineManager));
  }

  providerModules() {
    super.providerModules(
      界面组件树管理模块.getInstance(this),
      项目树后台同步模块.getInstance(this),
    );
  }
}
