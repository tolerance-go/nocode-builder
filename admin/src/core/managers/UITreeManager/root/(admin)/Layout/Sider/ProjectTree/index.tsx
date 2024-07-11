import {
  更新容器高度,
  useAppDispatch,
  useAppSelector,
  选中项目树容器并清空选中和激活节点,
  取消选中项目树容器,
  更新是否正在聚焦项目树区域,
  更新选中的节点是哪些,
} from '@/core/managers/UIStoreManager';
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { DirectoryTree } from './DirectoryTree';
import { theme } from 'antd';
import { css, cx } from '@emotion/css';
import { useClickAway } from 'react-use';
import { 测试标识 } from '@cypress/shared/constants';
import { 组件标识, 组件类名 } from '@/core/managers/UITreeManager/constants';

export const ProjectTree = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();

  const 是否选中了项目树容器 = useAppSelector(
    (state) => state.projectTree.是否选中了项目树容器,
  );

  /**
   * 当组件装载到 dom 上之后
   * 检查他的高度，然后调用 projectsStore.actions.setContainerHeight
   * 并且监听 dom 高度变化，同步设置
   * 设置 debounce 控制同步频率
   */
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        dispatch(更新容器高度(height));
      }
    };

    const debouncedUpdateHeight = debounce(updateHeight, 300);

    updateHeight();
    const resizeObserver = new ResizeObserver(debouncedUpdateHeight);
    const container = containerRef.current;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [dispatch]);

  useClickAway(containerRef, (event) => {
    dispatch(取消选中项目树容器());

    // 如果点击的是创建项目或者项目组按钮，则不取消选中
    if (
      (event.target as Element).closest(
        `.${组件类名.创建视图项目节点的菜单项}`,
      ) ||
      (event.target as Element).closest(`#${组件标识.创建项目节点的按钮}`) ||
      (event.target as Element).closest(`#${组件标识.创建项目组节点的按钮}`)
    ) {
      return;
    }

    dispatch(更新是否正在聚焦项目树区域(false));

    // 如果点击的项目树上下文菜单，则不取消选中
    if (
      (event.target as Element).closest(`.${组件类名.项目树节点右键菜单容器}`)
    ) {
      return;
    }

    dispatch(更新选中的节点是哪些([]));
  });

  return (
    <div
      data-test-id={测试标识.项目树容器}
      className={cx(
        css`
          border-top: 1px solid ${token.colorBorderSecondary};
          border-left: 1px solid transparent;
          border-bottom: 1px solid transparent;
          border-right: 1px solid ${token.colorBorderSecondary};
          &.selected {
            border: 1px solid ${token.blue6};
          }
        `,
        是否选中了项目树容器 ? 'selected' : null,
      )}
      ref={containerRef}
      style={{
        height: '100%',
        flexGrow: 1,
      }}
      onClick={(event) => {
        dispatch(更新是否正在聚焦项目树区域(true));

        // 只处理当前绑定事件的 dom 的点击事件
        if (event.target !== event.currentTarget) return;
        dispatch(选中项目树容器并清空选中和激活节点());
      }}
    >
      <DirectoryTree />
    </div>
  );
};
