import {
  useAppDispatch,
  useAppSelector,
  过滤掉包含父节点在内的节点,
} from '@/core/managers/UIStoreManager';
import { 组件类名 } from '@/core/managers/UITreeManager/constants';
import {
  use全局事件系统,
  use界面状态管理者,
} from '@/core/managers/UITreeManager/hooks';
import { useKeyPressEventByKeyboardJs } from '@/common/hooks';
import { 测试标识 } from '@/common/constants';
import { css, cx } from '@emotion/css';
import { theme } from 'antd';
import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { DirectoryTree } from './DirectoryTree';
import { ToolBar } from './ToolBar';

export const ProjectTree = () => {
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();
  const 全局事件系统 = use全局事件系统();

  const {
    store: reduxStore,
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = use界面状态管理者();

  const dispatch = useAppDispatch();

  const 是否选中了项目树容器 = useAppSelector(
    (state) => state.projectTree.是否选中了项目树容器,
  );
  const 是否正在聚焦项目树区域 = useAppSelector(
    (state) => state.projectTree.是否正在聚焦项目树区域,
  );
  /**
   * 当组件装载到 dom 上之后
   * 检查他的高度，然后调用 projectsStore.actions.setContainerHeight
   * 并且监听 dom 高度变化，同步设置
   * 设置 debounce 控制同步频率
   */
  useEffect(() => {
    const updateHeight = () => {
      if (treeContainerRef.current) {
        const height = treeContainerRef.current.clientHeight;
        dispatch(projectTreeActions.更新容器高度(height));
      }
    };

    const debouncedUpdateHeight = debounce(updateHeight, 300);

    updateHeight();
    const resizeObserver = new ResizeObserver(debouncedUpdateHeight);
    const container = treeContainerRef.current;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [dispatch, projectTreeActions]);

  useKeyPressEventByKeyboardJs(['delete'], () => {
    const {
      projectTree: {
        所有已经选中的节点,
        当前正在编辑的项目树节点的key,
        是否正在聚焦项目树区域,
        derived_节点到父节点的映射,
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

    const 互不包含选中节点 = 过滤掉包含父节点在内的节点(
      所有已经选中的节点,
      derived_节点到父节点的映射,
    );

    dispatch(projectTreeActions.删除节点(互不包含选中节点));
  });

  useKeyPressEventByKeyboardJs(['f2'], () => {
    const {
      projectTree: { 是否正在聚焦项目树区域, 当前聚焦的节点key },
    } = reduxStore.getState();

    if (!是否正在聚焦项目树区域) return;

    if (!当前聚焦的节点key) return;

    dispatch(
      projectTreeActions.更新当前编辑节点是哪个并更新输入框的值(
        当前聚焦的节点key,
      ),
    );
  });

  useKeyPressEventByKeyboardJs(['ctrl + z'], () => {
    if (!是否正在聚焦项目树区域) return;

    全局事件系统.emit('界面视图管理者/用户撤销项目树', undefined);
  });

  useKeyPressEventByKeyboardJs(['ctrl + shift + z'], () => {
    if (!是否正在聚焦项目树区域) return;

    全局事件系统.emit('界面视图管理者/用户重做项目树', undefined);
  });

  useClickAway(containerRef, (event) => {
    if (
      // 如果点击的是创建项目或者项目组按钮，则不取消选中
      (event.target as Element).closest(
        `.${组件类名.创建视图项目节点的菜单项}`,
      ) ||
      // 如果点击的项目树上下文菜单，则不取消选中
      (event.target as Element).closest(`.${组件类名.项目树节点右键菜单容器}`)
    ) {
      return;
    }

    dispatch(projectTreeActions.更新是否正在聚焦项目树区域(false));
    dispatch(projectTreeActions.更新选中的节点是哪些([]));
    dispatch(projectTreeActions.更新当前聚焦的节点key(null));
  });

  useClickAway(treeContainerRef, () => {
    dispatch(projectTreeActions.取消选中项目树容器());
  });

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => {
        // 处理所有内部的点击冒泡
        dispatch(projectTreeActions.更新是否正在聚焦项目树区域(true));
      }}
      data-test-id={测试标识.项目树区域容器}
      className={cx(是否正在聚焦项目树区域 && 'focused')}
    >
      <ToolBar />
      <div
        data-test-id={测试标识.项目树容器}
        className={cx(
          css`
            border-top: 1px solid transparent;
            border-left: 1px solid transparent;
            border-bottom: 1px solid transparent;
            border-right: 1px solid ${token.colorBorderSecondary};
            &.selected {
              border: 1px solid ${token.blue6};
            }
          `,
          是否选中了项目树容器 ? 'selected' : null,
        )}
        ref={treeContainerRef}
        style={{
          height: '100%',
          flexGrow: 1,
        }}
        onClick={(event) => {
          // 只处理当前绑定事件的 dom 的点击事件
          if (event.target !== event.currentTarget) return;
          dispatch(
            projectTreeActions.选中项目树容器并清空选中和激活还有聚焦节点(),
          );
        }}
      >
        <DirectoryTree />
      </div>
    </div>
  );
};
