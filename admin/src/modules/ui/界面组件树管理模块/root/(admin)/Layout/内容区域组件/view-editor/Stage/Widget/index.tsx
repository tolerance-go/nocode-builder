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
import { SlotElement, SlotElementProps } from '../SlotElement';
import { SlotPlaceholder } from '../SlotPlaceholder';
import { SlotPlaceholderType } from '../SlotPlaceholder/enums';

// 定义拖放类型
const ItemType = {
  CARD: 'CARD',
};

export interface WidgetProps {
  node: WidgetTreeDataNode;
  getStageHeight: () => number; // 添加获取高度的方法
}

export const Widget: React.FC<WidgetProps> = ({ node, getStageHeight }) => {
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
            <SlotPlaceholder
              key={SlotPlaceholderType.Before}
              type={SlotPlaceholderType.Before}
            />,
            ...curr.children.map((child) => (
              <SlotElement
                key={child.key}
                node={child}
                getStageHeight={getStageHeight}
              />
            )),
            <SlotPlaceholder
              key={SlotPlaceholderType.After}
              type={SlotPlaceholderType.After}
            />,
          ]
        : [
            <SlotPlaceholder
              key={SlotPlaceholderType.Empty}
              type={SlotPlaceholderType.Empty}
            />,
          ];

      return prev;
    },
    {} as Record<string, ReactElement<SlotElementProps>[]>,
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
          getStageHeight,
        },
      )}
    </div>
  );
};
