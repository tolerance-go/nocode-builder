import { EngineBase } from '@/base';
import { 本地数据管理模块 } from '@/modules/本地数据管理模块';

export class 基础引擎 extends EngineBase {
  protected providerModules() {
    super.providerModules(本地数据管理模块.getInstance(this));
  }
}
