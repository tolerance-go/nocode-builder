import { ViewKey } from '@/common/types';
import {
  useAppDispatch,
  useAppSelector,
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
  WidgetTreeDataNode,
  WidgetTreeNodeData,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { useEffect, useState } from 'react';
import { Widget } from '../Widget';
import { Placeholder } from './Placeholder';
import { SlotPlaceholderPosition } from './Placeholder/enums';

export type SlotProps = {
  node: WidgetSlotTreeDataNode;
  isDragging: boolean;
  widgetNodeData: WidgetTreeNodeData;
  slotNodeData: WidgetSlotTreeNodeData;
};

enum RelativePosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  Center = 'center',
  Unknown = 'unknown',
}

const getRelativePosition = (
  x: number,
  y: number,
  width: number,
  height: number,
): RelativePosition => {
  const centerX = width / 2;
  const centerY = height / 2;
  if (x < centerX && y < centerY) {
    return RelativePosition.TopLeft;
  } else if (x >= centerX && y < centerY) {
    return RelativePosition.TopRight;
  } else if (x < centerX && y >= centerY) {
    return RelativePosition.BottomLeft;
  } else if (x >= centerX && y >= centerY) {
    return RelativePosition.BottomRight;
  } else if (x === centerX && y === centerY) {
    return RelativePosition.Center;
  } else {
    return RelativePosition.Unknown;
  }
};

const PlaceholderGroup = ({
  node,
  isDragging,
  widgetDataNode,
  slotNodeData,
  nodeIndex,
  widgetHoveredIndex,
  temporarilyCloseSlot,
  onWidgetDragEnter,
  onWidgetDragLeave,
  onWidgetDragEnterWithoutInner,
  onWidgetDragLeaveWithoutInner,
}: {
  node: WidgetTreeDataNode;
  isDragging: boolean;
  widgetDataNode: WidgetTreeNodeData;
  slotNodeData: WidgetSlotTreeNodeData;
  nodeIndex: number;
  widgetHoveredIndex?: number;
  onWidgetDragEnterWithoutInner?: (
    event: React.DragEvent<HTMLDivElement>,
  ) => void;
  onWidgetDragLeaveWithoutInner?: (
    event: React.DragEvent<HTMLDivElement>,
  ) => void;
  onWidgetDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onWidgetDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  // 占位插槽组件需要提供一个接口来暂时关闭占位插槽
  temporarilyCloseSlot?: boolean;
}) => {
  const [closestToDragMouseHolderIndex, setClosestToDragMouseHolderIndex] =
    useState<number | null>(null);

  const handleWidgetDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    onWidgetDragEnterWithoutInner?.(event);
  };

  const handleWidgetDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    onWidgetDragLeaveWithoutInner?.(event);
  };

  const handleWidgetDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x 坐标相对于组件区域左上角
    const y = event.clientY - rect.top; // y 坐标相对于组件区域左上角

    const position = getRelativePosition(x, y, rect.width, rect.height);

    if (
      position === RelativePosition.TopLeft ||
      position === RelativePosition.BottomLeft
    ) {
      setClosestToDragMouseHolderIndex(nodeIndex);
    } else if (
      position === RelativePosition.TopRight ||
      position === RelativePosition.BottomRight
    ) {
      setClosestToDragMouseHolderIndex(nodeIndex + 1);
    }
  };

  return (
    <>
      <Placeholder
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
        isClosestToDragMouse={closestToDragMouseHolderIndex === nodeIndex}
        temporarilyCloseSlot={temporarilyCloseSlot}
      />
      <Widget
        node={node}
        onDragEnterWithoutInner={handleWidgetDragEnter}
        onDragOver={handleWidgetDragOver}
        onDragLeaveWithoutInner={handleWidgetDragLeave}
        onDragEnter={onWidgetDragEnter}
        onDragLeave={onWidgetDragLeave}
      />
      <Placeholder
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex + 1}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
        isClosestToDragMouse={closestToDragMouseHolderIndex === nodeIndex + 1}
        temporarilyCloseSlot={temporarilyCloseSlot}
      />
    </>
  );
};
export const Slot = ({
  node,
  isDragging,
  widgetNodeData,
  slotNodeData,
}: SlotProps) => {
  const [widgetDragStayedItemMeta, setWidgetDragStayedItemMeta] = useState<{
    index: number;
    widgetKey: ViewKey;
  } | null>(null);

  const dispatch = useAppDispatch();

  const { 界面状态仓库模块 } = 获取模块上下文();

  const childrenSlots = node.children?.flatMap(
    (childCompWidget) => childCompWidget.children || [],
  );

  const 子插槽正在被鼠标拖拽stay = useAppSelector((state) => {
    return (
      state.projectContent.拖拽stay的插槽节点keys路径.includes(node.key) &&
      childrenSlots
        ?.map((item) => item.key)
        .some((item) =>
          state.projectContent.拖拽stay的插槽节点keys路径.includes(item),
        )
    );
  });

  const handleWidgetDragEnterWithoutInner = (
    widgetKey: ViewKey,
    index: number,
  ) => {
    setWidgetDragStayedItemMeta({
      index,
      widgetKey,
    });
    dispatch(
      界面状态仓库模块.slices.projectContent.actions.向拖拽stay的插槽节点路径添加key(
        {
          widgetKey: node.key,
        },
      ),
    );
  };

  useEffect(() => {
    if (!isDragging) {
      setWidgetDragStayedItemMeta(null);
    }
  }, [isDragging]);

  return (
    <>
      {node.children?.length ? (
        <>
          {node.children.map((child, nodeIndex) => (
            <PlaceholderGroup
              key={child.key}
              node={child}
              isDragging={isDragging}
              widgetDataNode={widgetNodeData}
              slotNodeData={slotNodeData}
              nodeIndex={nodeIndex}
              widgetHoveredIndex={widgetDragStayedItemMeta?.index}
              temporarilyCloseSlot={子插槽正在被鼠标拖拽stay}
              onWidgetDragEnterWithoutInner={() =>
                handleWidgetDragEnterWithoutInner(child.key, nodeIndex)
              }
              onWidgetDragLeaveWithoutInner={() => {
                dispatch(
                  界面状态仓库模块.slices.projectContent.actions.删除拖拽stay的插槽节点路径中的key(
                    {
                      widgetKey: node.key,
                    },
                  ),
                );
              }}
            />
          ))}
        </>
      ) : (
        <Placeholder
          isDragging={isDragging}
          widgetDataNode={widgetNodeData}
          slotDataNode={slotNodeData}
          index={0}
          position={SlotPlaceholderPosition.Empty}
          temporarilyCloseSlot={子插槽正在被鼠标拖拽stay}
        />
      )}
    </>
  );
};
