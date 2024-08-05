import {
  widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData,
  widgetTreeNodeDataBaseIsWidgetTreeNodeData,
} from '@/common/utils';
import {
  useAppSelector,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
// import { theme } from 'antd';
import React, { createElement, CSSProperties, ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../../constants';
import { Slot, SlotProps } from '../Slot';
import { WidgetDisplayEnum } from '@/_gen/models';

// 定义拖放类型

const widgetDisplayMap = new Map<WidgetDisplayEnum, string>([
  [WidgetDisplayEnum.Block, 'block'],
  [WidgetDisplayEnum.InlineBlock, 'inline-block'],
  [WidgetDisplayEnum.Flex, 'flex'],
  [WidgetDisplayEnum.InlineFlex, 'inline-flex'],
  [WidgetDisplayEnum.Grid, 'grid'],
  [WidgetDisplayEnum.InlineGrid, 'inline-grid'],
  [WidgetDisplayEnum.Table, 'table'],
]);

export interface WidgetProps {
  node: WidgetTreeDataNode;
}

export const Widget: React.FC<WidgetProps> = ({ node }) => {
  // const { token } = theme.useToken();
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
    (prev, slotNode) => {
      const slotNodeData = widgetTreeNodeDatas[slotNode.key];

      if (!widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData(slotNodeData)) {
        throw new Error('slotNodeData is not a WidgetSlotTreeNodeData');
      }

      prev[slotNodeData.name] = (
        <Slot
          node={slotNode}
          isDragging={isDragging}
          widgetDataNode={nodeData}
          slotNodeData={slotNodeData}
        />
      );

      return prev;
    },
    {} as Record<string, ReactElement<SlotProps>>,
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
    // backgroundColor: isOver ? token.colorBgBase : 'transparent',
    display: widgetDisplayMap.get(nodeData.display),
  };

  console.log('nodeData', nodeData);

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
