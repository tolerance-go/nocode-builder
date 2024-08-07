import {
  widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData,
  widgetTreeNodeDataBaseIsWidgetTreeNodeData,
} from '@/common/utils';
import {
  useAppSelector,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { widgetDisplayEnumToCssValue } from '@/modules/ui/界面组件树管理模块/utils';
import React, { createElement, CSSProperties, ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../../constants';
import { CardDragItem } from '../../WidgetDrawer/CardItem';
import { Slot, SlotProps } from '../Slot';

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

  const [{ isOver }, drop] = useDrop<
    CardDragItem,
    unknown,
    {
      isOver: boolean;
      dragItem?: CardDragItem;
    }
  >({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      dragItem: monitor.getItem(),
    }),
  });

  const widgetStyle: CSSProperties = {
    display: widgetDisplayEnumToCssValue(nodeData.display),
  };

  return (
    <div
      ref={drop}
      style={{
        ...widgetStyle,
        background: 'red',
      }}
      onDragEnter={() => {
        console.log('drag enter');
      }}
      onDragLeave={() => {
        console.log('drag leave');
      }}
    >
      {createElement(
        部件组件管理模块.getWidgetComponent(
          nodeData.widgetLibName,
          nodeData.componentName,
        ),
        {
          mode: 'edit',
          slotElements,
          isDragging,
          isOverWidget: isOver,
          dataSets: {
            ['data-widget-key']: node.key,
          },
        },
      )}
    </div>
  );
};
