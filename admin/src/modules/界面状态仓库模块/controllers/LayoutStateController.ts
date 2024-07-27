import {
  AppSlices,
  AppStore,
  ProjectTreeNodeDataRecord,
} from '../../界面状态管理器模块/types';
import { ViewKey } from '@/common/types';
import { 事件中心系统 } from '@/modules/事件中心系统';

export class LayoutStateController {
  store: AppStore;
  slices: AppSlices;

  constructor(store: AppStore, slices: AppSlices) {
    this.store = store;
    this.slices = slices;
    this.注册拖拽监听();
  }

  注册拖拽监听() {
    let previousState = this.store.getState(); // 初始化之前的 state

    this.store.subscribe(() => {
      const currentState = this.store.getState(); // 获取当前的 state

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
            this.store.dispatch(
              this.slices.layout.actions.显示拖拽时鼠标跟随组件([
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
            this.store.dispatch(
              this.slices.layout.actions.显示拖拽时鼠标跟随组件([
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
          this.store.dispatch(
            this.slices.layout.actions.隐藏并取消拖拽时鼠标跟随组件(),
          );
        }
      }

      previousState = currentState; // 更新之前的 state
    });
  }

  async onSetup(事件中心系统实例: 事件中心系统): Promise<void> {
    事件中心系统实例.on('项目树后台同步模块/新增项目记录成功', (event) => {});
  }
}
