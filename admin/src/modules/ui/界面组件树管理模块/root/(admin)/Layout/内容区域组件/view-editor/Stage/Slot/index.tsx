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
  widgetDataNode: WidgetTreeNodeData;
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

const SlotItem = ({
  node,
  isDragging,
  widgetDataNode,
  slotNodeData,
  nodeIndex,
  widgetHoveredIndex,
  onDragEnter,
  onDragLeave,
}: {
  node: WidgetTreeDataNode;
  isDragging: boolean;
  widgetDataNode: WidgetTreeNodeData;
  slotNodeData: WidgetSlotTreeNodeData;
  nodeIndex: number;
  widgetHoveredIndex?: number;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {
  const placeholderStartRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const placeholderEndRef = useRef<HTMLDivElement>(null);

  const [closestToDragMouseHolderIndex, setClosestToDragMouseHolderIndex] =
    useState<number | null>(null);

  const handleWidgetDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    onDragEnter?.(event);
  };

  const handleWidgetDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    onDragLeave?.(event);
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
        onDragEnter={handleWidgetDragEnter}
        onDragOver={handleWidgetDragOver}
        onDragLeave={handleWidgetDragLeave}
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
  widgetDataNode,
  slotNodeData,
}: SlotProps) => {
  const [widgetHoveredItem, setWidgetHovered] = useState<{
    index: number;
    widgetKey: ViewKey;
  } | null>(null);

  /**
   * 组件下一个组件，enter 会先执行，但是 state 不会立即更新，这里用 ref 存储突变数据
   *
   * @param widgetKey
   * @param index
   */
  const handleWidgetDragEnter = (widgetKey: ViewKey, index: number) => {
    setWidgetHovered({
      index,
      widgetKey,
    });
  };

  useEffect(() => {
    if (!isDragging) {
      setWidgetHovered(null);
    }
  }, [isDragging]);

  return (
    <>
      {node.children?.length ? (
        <>
          {node.children.map((child, nodeIndex) => (
            <SlotItem
              key={child.key}
              node={child}
              isDragging={isDragging}
              widgetDataNode={widgetDataNode}
              slotNodeData={slotNodeData}
              nodeIndex={nodeIndex}
              widgetHoveredIndex={widgetHoveredItem?.index}
              onDragEnter={() => handleWidgetDragEnter(child.key, nodeIndex)}
            />
          ))}
        </>
      ) : (
        <Placeholder
          isDragging={isDragging}
          widgetDataNode={widgetDataNode}
          slotDataNode={slotNodeData}
          index={0}
          position={SlotPlaceholderPosition.Empty}
        />
      )}
    </>
  );
};
