import { EngineBase, ModuleBase } from '@/base';
import { UserModelTable } from '../model-tables/UserModelTable';

export class 后台数据管理模块 extends ModuleBase {
  private static instance: 后台数据管理模块;

  public static getInstance(engine: EngineBase): 后台数据管理模块 {
    if (!后台数据管理模块.instance) {
      后台数据管理模块.instance = new 后台数据管理模块(engine);
    }
    return 后台数据管理模块.instance;
  }

  protected requireModules(): void {
    super.requireModules(new UserModelTable(this.engine));
  }
}
