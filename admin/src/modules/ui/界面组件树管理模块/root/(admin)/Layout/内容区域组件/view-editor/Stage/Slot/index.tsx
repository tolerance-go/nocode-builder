import { ViewKey } from '@/common/types';
import {
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
  WidgetTreeDataNode,
  WidgetTreeNodeData,
} from '@/modules/ui/界面状态仓库模块';
import { useEffect, useRef, useState } from 'react';
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
  onWidgetDragEnter,
  onWidgetDragLeave,
  onWidgetDragEnterWithoutInner: onDragEnterWithoutInner,
  onWidgetDragLeaveWithoutInner: onDragLeaveWithoutInner,
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
}) => {
  const placeholderStartRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const placeholderEndRef = useRef<HTMLDivElement>(null);

  const [closestToDragMouseHolderIndex, setClosestToDragMouseHolderIndex] =
    useState<number | null>(null);

  const handleWidgetDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    onDragEnterWithoutInner?.(event);
  };

  const handleWidgetDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    onDragLeaveWithoutInner?.(event);
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
        ref={placeholderStartRef}
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
        isClosestToDragMouse={closestToDragMouseHolderIndex === nodeIndex}
      />
      <Widget
        ref={widgetRef}
        node={node}
        onDragEnterWithoutInner={handleWidgetDragEnter}
        onDragOver={handleWidgetDragOver}
        onDragLeaveWithoutInner={handleWidgetDragLeave}
        onDragEnter={onWidgetDragEnter}
        onDragLeave={onWidgetDragLeave}
      />
      <Placeholder
        ref={placeholderEndRef}
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex + 1}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
        isClosestToDragMouse={closestToDragMouseHolderIndex === nodeIndex + 1}
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

  /**
   * Slot 组件需要维护内部某个状态，用来表示鼠标是否已经 hover 自己的后代元素而非自身
   */
  const [isDragStayedOnDescendant, setIsDragStayedOnDescendant] =
    useState(false);

  const handleWidgetDragEnterWithoutInner = (
    widgetKey: ViewKey,
    index: number,
  ) => {
    setWidgetDragStayedItemMeta({
      index,
      widgetKey,
    });
  };

  useEffect(() => {
    if (!isDragging) {
      setWidgetDragStayedItemMeta(null);
    }
  }, [isDragging]);

  return (
    <>
      {isDragStayedOnDescendant ? 'true' : 'false'}
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
              onWidgetDragEnterWithoutInner={() =>
                handleWidgetDragEnterWithoutInner(child.key, nodeIndex)
              }
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
        />
      )}
    </>
  );
};
