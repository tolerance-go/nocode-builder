import { EngineBase } from '@/base';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 后台数据管理模块 } from '@/modules/后台数据管理模块';
import { 本地数据管理模块 } from '@/modules/本地数据管理模块';

export class 基础引擎 extends EngineBase {
  protected providerModules() {
    super.providerModules(
      事件中心系统.getInstance(this),
      本地数据管理模块.getInstance(this),
      后台数据管理模块.getInstance(this),
    );
  }
}
