import { mockWidgetTree, mockWidgetTreeNodeDatas } from '@/mocks/widgetTree';
import { useAppDispatch, useAppSelector } from '@/modules/界面状态仓库模块';
import { use界面状态管理者 } from '@/modules/界面组件树管理模块/hooks';
import { Tree } from 'antd';
import { useEffect } from 'react';

export const WidgetTree = () => {
  const dispatch = useAppDispatch();
  const {
    slices: {
      projectContent: {
        actions: { updateWidgetTreeData },
      },
    },
  } = use界面状态管理者();
  const widgetTree = useAppSelector((state) => state.projectContent.widgetTree);

  useEffect(() => {
    dispatch(
      updateWidgetTreeData({
        widgetTree: mockWidgetTree,
        widgetTreeNodeDatas: mockWidgetTreeNodeDatas,
      }),
    );
  }, [dispatch, updateWidgetTreeData]);

  return <Tree treeData={widgetTree} blockNode />;
};
