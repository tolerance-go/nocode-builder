import {
  AppSlices,
  AppStore,
  ProjectTreeNodeDataRecord,
  StateControllerBase,
} from '../types';
import { ViewKey } from '@/common/types';

export class LayoutStateController extends StateControllerBase {
  async onCreateStore(reduxStore: AppStore, slices: AppSlices): Promise<void> {
    let previousState = reduxStore.getState(); // 初始化之前的 state

    reduxStore.subscribe(() => {
      const currentState = reduxStore.getState(); // 获取当前的 state

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
            reduxStore.dispatch(
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
            reduxStore.dispatch(
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
          reduxStore.dispatch(
            slices.layout.actions.隐藏并取消拖拽时鼠标跟随组件(),
          );
        }
      }

      previousState = currentState; // 更新之前的 state
    });
  }
}
