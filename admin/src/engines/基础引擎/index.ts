import { EngineBase } from '@/base';
import { UserModelTable } from '@/modules/model-tables/UserModelTable';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 后台数据管理模块 } from '@/modules/后台数据管理模块';
import { 本地数据管理模块 } from '@/modules/本地数据管理模块';

export class 基础引擎 extends EngineBase {
  public get loginUser() {
    return this.getModule(后台数据管理模块).getDependModule(UserModelTable)
      .loginUser;
  }

  setLocalItem<T>(key: string, value: T): void {
    this.getModule(本地数据管理模块).set(key, value);
  }

  getLocalItem<T>(key: string): T | undefined {
    return this.getModule(本地数据管理模块).get(key);
  }

  removeLocalItem(key: string): void {
    this.getModule(本地数据管理模块).remove(key);
  }

  protected providerModules() {
    super.providerModules(
      事件中心系统.getInstance(this),
      本地数据管理模块.getInstance(this),
      后台数据管理模块.getInstance(this),
    );
  }
}
