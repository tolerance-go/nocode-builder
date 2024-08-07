import { ViewKey } from '@/common/types';
import {
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
  WidgetTreeDataNode,
  WidgetTreeNodeData,
} from '@/modules/ui/界面状态仓库模块';
import { useRef, useState } from 'react';
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
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!itemRef.current?.contains(event.relatedTarget as Node)) {
      onDragEnter?.(event);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!itemRef.current?.contains(event.relatedTarget as Node)) {
      onDragLeave?.(event);
    }
  };

  return (
    <div
      ref={itemRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <Placeholder
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
      />
      <Widget node={node} />
      <Placeholder
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex + 1}
        position={SlotPlaceholderPosition.Split}
        isHoverWidgetAdjacent={widgetHoveredIndex === nodeIndex}
      />
    </div>
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

  const widgetHoveredRef = useRef(widgetHoveredItem);

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
    widgetHoveredRef.current = {
      index,
      widgetKey,
    };
  };

  const handleWidgetDragLeave = (widgetKey: ViewKey) => {
    // 只有当当前离开的 Widget 是被拖拽进入的那个时，才清除状态
    if (widgetHoveredRef.current?.widgetKey === widgetKey) {
      setWidgetHovered(null);
    }
  };

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
              onDragLeave={() => handleWidgetDragLeave(child.key)}
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
          isHoverWidgetAdjacent={false}
        />
      )}
    </>
  );
};
