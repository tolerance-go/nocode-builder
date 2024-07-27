import { EngineBase, ModuleBase } from '@/base';
import { ProjectTreeModel } from '../view-models/ProjectTreeModel';

export class 界面状态管理模块 extends ModuleBase {
  private static instance: 界面状态管理模块;

  public static getInstance(engine: EngineBase): 界面状态管理模块 {
    if (!界面状态管理模块.instance) {
      界面状态管理模块.instance = new 界面状态管理模块(engine);
    }

    return 界面状态管理模块.instance;
  }

  protected requireModules(): void {
    super.requireModules(ProjectTreeModel.getInstance(this.engine));
  }
}
