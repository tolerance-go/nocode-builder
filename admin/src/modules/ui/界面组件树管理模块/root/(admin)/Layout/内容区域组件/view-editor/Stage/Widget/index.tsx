import {
  widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData,
  widgetTreeNodeDataBaseIsWidgetTreeNodeData,
} from '@/common/utils';
import {
  useAppSelector,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { theme } from 'antd';
import React, { createElement, CSSProperties, ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import { ElementSlotItem, ElementSlotItemProps } from '../ElementSlotItem';
import { PlaceholderSlotItem } from '../PlaceholderSlotItem';
import { SlotPlaceholderPosition } from '../PlaceholderSlotItem/enums';
import { ItemType } from '../../../constants';

// 定义拖放类型

export interface WidgetProps {
  node: WidgetTreeDataNode;
}

export const Widget: React.FC<WidgetProps> = ({ node }) => {
  const { token } = theme.useToken();
  const nodeData = useAppSelector(
    (state) => state.projectContent.widgetTreeNodeDatas[node.key],
  );

  const widgetTreeNodeDatas = useAppSelector(
    (state) => state.projectContent.widgetTreeNodeDatas,
  );
  const isDragging = useAppSelector((state) => state.projectContent.isDragging);
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

      prev[slotNodeData.name] = curr.children?.length
        ? [
            <PlaceholderSlotItem
              isDragging={isDragging}
              key={SlotPlaceholderPosition.Before}
              position={SlotPlaceholderPosition.Before}
              widgetDataNode={nodeData}
              slotDataNode={slotNodeData}
              index={-1}
            />,
            ...curr.children.map((child) => (
              <ElementSlotItem
                isDragging={isDragging}
                key={child.key}
                node={child}
                widgetDataNode={nodeData}
                slotDataNode={slotNodeData}
                index={-1}
              />
            )),
            <PlaceholderSlotItem
              isDragging={isDragging}
              key={SlotPlaceholderPosition.After}
              position={SlotPlaceholderPosition.After}
              widgetDataNode={nodeData}
              slotDataNode={slotNodeData}
              index={-1}
            />,
          ]
        : [
            <PlaceholderSlotItem
              isDragging={isDragging}
              key={SlotPlaceholderPosition.Empty}
              position={SlotPlaceholderPosition.Empty}
              widgetDataNode={nodeData}
              slotDataNode={slotNodeData}
              index={0}
            />,
          ];

      return prev;
    },
    {} as Record<string, ReactElement<ElementSlotItemProps>[]>,
  );

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const widgetStyle: CSSProperties = {
    // border: isOver ? `2px dashed ${token.colorPrimary}` : 'none',
    // padding: '16px',
    // borderRadius: '4px',
    backgroundColor: isOver ? token.colorBgBase : 'transparent',
  };

  return (
    <div ref={drop} style={widgetStyle}>
      {createElement(
        部件组件管理模块.getWidgetComponent(
          nodeData.widgetLibName,
          nodeData.componentName,
        ),
        {
          slotElements,
          isDragging,
          isOverWidget: isOver,
        },
      )}
    </div>
  );
};
