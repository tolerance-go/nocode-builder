import { EngineBase, ModuleBase } from '@/base';
import { generateId } from '@/common/utils/generateId';
import {
  WidgetTreeNodeType,
  界面状态仓库模块,
} from '@/modules/ui/界面状态仓库模块';
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

        const { store, slices } = this.getDependModule(界面状态仓库模块);

        const key = generateId();

        store.dispatch(
          slices.projectContent.actions.添加组件到插槽({
            parentKey: event.目标部件key,
            slotKey: event.目标插槽key,
            widgetNode: {
              key,
              type: WidgetTreeNodeType.Widget,
            },
            widgetData: {
              key,
              type: WidgetTreeNodeType.Widget,
              widgetLibName: event.被拖动组件的libName,
              componentName: event.被拖动组件Name,
              title: event.被拖动组件Name,
              display: event.被拖动组件的display,
            },
            index: event.目标插槽index,
          }),
        );
      },
    );
  }

  protected async onSetup(): Promise<void> {}

  protected requireModules(): void {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine),
    );
  }
}
