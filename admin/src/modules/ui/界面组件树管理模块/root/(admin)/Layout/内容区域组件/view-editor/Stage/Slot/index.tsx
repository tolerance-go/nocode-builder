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

const SlotItem = ({
  node,
  isDragging,
  widgetDataNode,
  slotNodeData,
  nodeIndex,
  widgetHoveredIndex,
  onDragEnter,
}: {
  node: WidgetTreeDataNode;
  isDragging: boolean;
  widgetDataNode: WidgetTreeNodeData;
  slotNodeData: WidgetSlotTreeNodeData;
  nodeIndex: number;
  widgetHoveredIndex?: number;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {
  const placeholderStartRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const placeholderEndRef = useRef<HTMLDivElement>(null);

  const handleWidgetDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!widgetRef.current?.contains(event.relatedTarget as Node)) {
      onDragEnter?.(event);
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
      />
      <Widget ref={widgetRef} node={node} onDragEnter={handleWidgetDragEnter} />
      <Placeholder
        ref={placeholderEndRef}
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex + 1}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
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
