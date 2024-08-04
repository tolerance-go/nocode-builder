import { EngineBase, ModuleBase } from '@/base';
import { 界面状态仓库模块 } from '@/modules/ui/界面状态仓库模块';
import { 事件中心系统 } from '@/modules/事件中心系统';

export class 视图项目模型管理模块 extends ModuleBase {
  private static instance: 视图项目模型管理模块;

  public static getInstance(engine: EngineBase): 视图项目模型管理模块 {
    if (!视图项目模型管理模块.instance) {
      视图项目模型管理模块.instance = new 视图项目模型管理模块(engine);
    }

    return 视图项目模型管理模块.instance;
  }

  constructor(engine: EngineBase) {
    super(engine);

    this.getDependModule(事件中心系统).on(
      '界面视图管理者/拖动组件放置到指定部件的插槽下时',
      (event) => {
        console.log('拖动组件放置到指定部件的插槽下时', event);
      },
    );
  }

  protected async onSetup(): Promise<void> {}

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine),
    );
  }
}
