import { EngineBase, ModuleBase } from '@/base';
import { ViewKey } from '@/common/types';
import { ProjectTreeNodeDataRecord } from '@/modules/ui/界面状态仓库模块/types';
import { 界面状态仓库模块 } from '@/modules/ui/界面状态仓库模块';
import { 事件中心系统 } from '@/modules/事件中心系统';
import { 浏览器代理模块 } from '../simulations/浏览器代理模块';
import { ProjectKeyQueryKey } from '@/common/constants';

export class ProjectTreeModel extends ModuleBase {
  private static instance: ProjectTreeModel;

  public static getInstance(engine: EngineBase): ProjectTreeModel {
    if (!ProjectTreeModel.instance) {
      ProjectTreeModel.instance = new ProjectTreeModel(engine);
    }

    return ProjectTreeModel.instance;
  }

  constructor(engine: EngineBase) {
    super(engine);

    this.注册拖拽监听();

    this.getDependModule(事件中心系统).on(
      '项目树后台同步模块/新增项目记录成功',
      (event) => {
        const storeModule = this.getDependModule(界面状态仓库模块);
        storeModule.store.dispatch(
          storeModule.slices.projectTree.actions.更新节点的数据({
            key: event.key,
            data: {
              backfillProjectRecordId: event.record.id,
            },
          }),
        );
      },
    );
    this.getDependModule(事件中心系统).on(
      '项目树后台同步模块/新增项目组记录成功',
      (event) => {
        const storeModule = this.getDependModule(界面状态仓库模块);
        storeModule.store.dispatch(
          storeModule.slices.projectTree.actions.更新节点的数据({
            key: event.key,
            data: {
              backfillProjectRecordId: event.record.id,
            },
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
      浏览器代理模块.getInstance(this.engine),
    );
  }

  private 注册拖拽监听() {
    const { store, slices } = this.getDependModule(界面状态仓库模块);
    let previousState = store.getState(); // 初始化之前的 state

    store.subscribe(() => {
      const currentState = store.getState(); // 获取当前的 state

      if (
        currentState.projectTree.激活的节点的key !==
        previousState.projectTree.激活的节点的key
      ) {
        this.当激活项目节点变化时(
          currentState.projectTree.激活的节点的key,
          previousState.projectTree.激活的节点的key,
        );
      }

      if (
        currentState.projectTree.当前正在拖拽的节点key &&
        previousState.projectTree.当前正在拖拽的节点key === null
      ) {
        if (currentState.layout.拖拽时鼠标附近的跟随组件是否显示 === false) {
          // 如果拖拽的节点是选中的节点
          // 那么显示拖拽节点数量
          if (
            currentState.projectTree.所有已经选中的节点.length > 1 &&
            currentState.projectTree.所有已经选中的节点.includes(
              currentState.projectTree.当前正在拖拽的节点key,
            )
          ) {
            store.dispatch(
              slices.layout.actions.显示拖拽时鼠标跟随组件([
                '拖拽中显示的组件id',
                {
                  count: currentState.projectTree.所有已经选中的节点.length,
                },
              ]),
            );
          } else {
            const 获取节点数据通过key如果找不到抛出异常 = (
              records: ProjectTreeNodeDataRecord,
              key: ViewKey,
            ) => {
              if (key in records) {
                return records[key];
              }

              throw new Error('数据不完整');
            };

            // 如果拖拽的节点不是选中的
            // 那么显示名称
            store.dispatch(
              slices.layout.actions.显示拖拽时鼠标跟随组件([
                '拖拽中显示的组件id',
                {
                  title: 获取节点数据通过key如果找不到抛出异常(
                    currentState.projectTree.项目树节点数据,
                    currentState.projectTree.当前正在拖拽的节点key,
                  ).title,
                },
              ]),
            );
          }
        }
      }

      if (
        currentState.projectTree.当前正在拖拽的节点key === null &&
        previousState.projectTree.当前正在拖拽的节点key
      ) {
        if (currentState.layout.拖拽时鼠标附近的跟随组件是否显示) {
          store.dispatch(slices.layout.actions.隐藏并取消拖拽时鼠标跟随组件());
        }
      }

      previousState = currentState; // 更新之前的 state
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private 当激活项目节点变化时(key: ViewKey | null, _prevKey: ViewKey | null) {
    this.getDependModule(浏览器代理模块).updateQueryParameter(
      ProjectKeyQueryKey,
      typeof key === 'number' ? String(key) : key,
    );
  }
}
