import { 组件标识, 组件类名 } from '@/core/managers/UITreeManager/constants';
import { useKeyPressEventByKeyboardJs } from '@/hooks';
import { 测试标识 } from '@cypress/shared/constants';
import { css, cx } from '@emotion/css';
import { theme } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { DirectoryTree } from './DirectoryTree';
import { useUIStoreManager } from '@/core/managers/UITreeManager/hooks';

export const ProjectTree = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();

  const {
    hooks: { useAppDispatch, useAppSelector },
    store: {
      更新容器高度,
      选中项目树容器并清空选中和激活还有聚焦节点,
      取消选中项目树容器,
      更新是否正在聚焦项目树区域,
      更新选中的节点是哪些,
      reduxStore,
      删除所有选中的节点,
      更新当前编辑节点是哪个并更新输入框的值,
      更新当前聚焦的节点key,
    },
  } = useUIStoreManager();
  const dispatch = useAppDispatch();

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

  useKeyPressEventByKeyboardJs(['delete'], () => {
    const {
      projectTree: {
        所有已经选中的节点,
        当前正在编辑的项目树节点的key,
        是否正在聚焦项目树区域,
      },
    } = reduxStore.getState();

    if (!是否正在聚焦项目树区域) return;

    if (!所有已经选中的节点.length) return;

    if (
      当前正在编辑的项目树节点的key &&
      所有已经选中的节点.includes(当前正在编辑的项目树节点的key)
    ) {
      return;
    }

    dispatch(删除所有选中的节点());
  });

  useKeyPressEventByKeyboardJs(['f2'], () => {
    const {
      projectTree: { 是否正在聚焦项目树区域, 当前聚焦的节点key },
    } = reduxStore.getState();

    if (!是否正在聚焦项目树区域) return;

    if (!当前聚焦的节点key) return;

    dispatch(更新当前编辑节点是哪个并更新输入框的值(当前聚焦的节点key));
  });

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

    // 如果点击的项目树上下文菜单，则不取消选中
    if (
      (event.target as Element).closest(`.${组件类名.项目树节点右键菜单容器}`)
    ) {
      return;
    }

    dispatch(更新是否正在聚焦项目树区域(false));
    dispatch(更新选中的节点是哪些([]));
    dispatch(更新当前聚焦的节点key(null));
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
        // 处理所有内部的点击冒泡
        dispatch(更新是否正在聚焦项目树区域(true));

        // 只处理当前绑定事件的 dom 的点击事件
        if (event.target !== event.currentTarget) return;
        dispatch(选中项目树容器并清空选中和激活还有聚焦节点());
      }}
    >
      <DirectoryTree />
    </div>
  );
};
