import { EngineBase, ModuleBase } from '@/base';
import { ProjectTreeModel } from '@/modules/view-models/ProjectTreeModel';
import { 视图项目模型管理模块 } from '../view-models/视图项目模型管理模块';

export class 界面状态管理模块 extends ModuleBase {
  private static instance: 界面状态管理模块;

  public static getInstance(engine: EngineBase): 界面状态管理模块 {
    if (!界面状态管理模块.instance) {
      界面状态管理模块.instance = new 界面状态管理模块(engine);
    }

    return 界面状态管理模块.instance;
  }

  protected requireModules(): void {
    super.requireModules(
      ProjectTreeModel.getInstance(this.engine),
      视图项目模型管理模块.getInstance(this.engine),
    );
  }
}
