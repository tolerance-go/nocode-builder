import {
  widgetTreeNodeDataBaseIsWidgetTreeNodeData,
  widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData,
} from '@/common/utils';
import {
  useAppSelector,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { ReactElement, createElement } from 'react';

export interface WidgetProps {
  node: WidgetTreeDataNode;
}

export const Widget: React.FC<WidgetProps> = ({ node }) => {
  const nodeData = useAppSelector(
    (state) => state.projectContent.widgetTreeNodeDatas[node.key],
  );

  const widgetTreeNodeDatas = useAppSelector(
    (state) => state.projectContent.widgetTreeNodeDatas,
  );

  if (!widgetTreeNodeDataBaseIsWidgetTreeNodeData(nodeData)) {
    throw new Error('nodeData is not a WidgetTreeNodeData');
  }

  const { 部件组件管理模块 } = 获取模块上下文();

  const slotElements = node.children?.reduce(
    (prev, curr) => {
      const slotNodeData = widgetTreeNodeDatas[curr.key];

      if (!widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData(slotNodeData)) {
        throw new Error('slotNodeData is not a WidgetSlotTreeNodeData');
      }

      prev[slotNodeData.name] =
        curr.children?.map((child) => (
          <SlotItem key={child.key} node={child} />
        )) ?? [];

      return prev;
    },
    {} as Record<string, ReactElement<SlotItemProps>[]>,
  );

  return (
    <div>
      {createElement(
        部件组件管理模块.getWidgetComponent(
          nodeData.widgetLibName,
          nodeData.componentName,
        ),
        {
          slotElements,
        },
      )}
    </div>
  );
};

export interface SlotItemProps {
  node: WidgetTreeDataNode;
}

const SlotItem: React.FC<SlotItemProps> = ({ node }) => {
  return (
    <div>
      <Widget node={node} />
    </div>
  );
};
