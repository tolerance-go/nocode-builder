import { useAppDispatch, useAppSelector } from '@/modules/ui/界面状态仓库模块';
import { use界面状态管理者 } from '@/modules/ui/界面组件树管理模块/hooks';
import { Tree } from 'antd';
import { useEffect } from 'react';

export const WidgetTree = () => {
  const dispatch = useAppDispatch();
  const {
    slices: { projectContent },
  } = use界面状态管理者();
  const widgetTree = useAppSelector((state) => state.projectContent.widgetTree);

  useEffect(() => {
    dispatch(projectContent.actions.初始化根部件());
  }, [dispatch, projectContent]);

  return <Tree treeData={widgetTree} blockNode />;
};
