import { ViewKey } from '@/common/types';
import {
  useAppDispatch,
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

const PlaceholderGroup = ({
  node,
  isDragging,
  widgetDataNode,
  slotNodeData,
  nodeIndex,
  hasNextWidget,
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
  hasNextWidget: boolean;
  onWidgetDragEnterWithoutInner?: (
    event: React.DragEvent<HTMLDivElement>,
  ) => void;
  onWidgetDragLeaveWithoutInner?: (
    event: React.DragEvent<HTMLDivElement>,
  ) => void;
  onWidgetDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onWidgetDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {
  const handleWidgetDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    onWidgetDragEnterWithoutInner?.(event);
  };

  const handleWidgetDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    onWidgetDragLeaveWithoutInner?.(event);
  };

  return (
    <>
      <Placeholder
        isDragging={isDragging}
        widgetDataNode={widgetDataNode}
        slotDataNode={slotNodeData}
        index={nodeIndex}
        position={SlotPlaceholderPosition.Split}
      />
      <Widget
        node={node}
        onDragEnterWithoutInner={handleWidgetDragEnter}
        onDragLeaveWithoutInner={handleWidgetDragLeave}
        onDragEnter={onWidgetDragEnter}
        onDragLeave={onWidgetDragLeave}
      />
      {!hasNextWidget && (
        <Placeholder
          isDragging={isDragging}
          widgetDataNode={widgetDataNode}
          slotDataNode={slotNodeData}
          index={nodeIndex + 1}
          position={SlotPlaceholderPosition.Split}
        />
      )}
    </>
  );
};
export const Slot = ({
  node,
  isDragging,
  widgetNodeData,
  slotNodeData,
}: SlotProps) => {
  const [, setWidgetDragStayedItemMeta] = useState<{
    index: number;
    widgetKey: ViewKey;
  } | null>(null);

  const dispatch = useAppDispatch();

  const { 界面状态仓库模块 } = 获取模块上下文();

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
              hasNextWidget={nodeIndex < node.children!.length - 1}
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
        />
      )}
    </>
  );
};
