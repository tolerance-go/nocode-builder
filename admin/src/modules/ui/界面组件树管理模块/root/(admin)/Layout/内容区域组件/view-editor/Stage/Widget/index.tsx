import {
  mergeRefs,
  widgetTreeNodeDataBaseIsWidgetSlotTreeNodeData,
  widgetTreeNodeDataBaseIsWidgetTreeNodeData,
} from '@/common/utils';
import {
  useAppDispatch,
  useAppSelector,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { widgetDisplayEnumToCssValue } from '@/modules/ui/界面组件树管理模块/utils';
import React, {
  createElement,
  CSSProperties,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../../constants';
import { CardDragItem } from '../../WidgetDrawer/CardItem';
import { Slot, SlotProps } from '../Slot';
import { theme } from 'antd';

export interface WidgetProps {
  node: WidgetTreeDataNode;
  onDragEnterWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const Widget = forwardRef<HTMLDivElement, WidgetProps>(
  (
    {
      node,
      onDragEnterWithoutInner,
      onDragLeaveWithoutInner,
      onDragOver,
      onDragEnter,
      onDragLeave,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const { 部件组件管理模块, 界面状态仓库模块 } = 获取模块上下文();

    const isHovered = useAppSelector(
      (state) => state.projectContent.当前鼠标hover的部件key === node.key,
    );

    const hoverCurrentNode = () => {
      dispatch(
        界面状态仓库模块.slices.projectContent.actions.更新当前鼠标悬停的组件部件key(
          {
            widgetKey: node.key,
          },
        ),
      );
    };

    const nodeData = useAppSelector(
      (state) => state.projectContent.widgetTreeNodeDatas[node.key],
    );

    const { token } = theme.useToken();

    const 当前聚集的部件是自身 = useAppSelector(
      (state) => state.projectContent.当前聚集的部件key === node.key,
    );
    const 当前选中的部件包括自身 = useAppSelector((state) =>
      state.projectContent.当前选中的部件keys.includes(node.key),
    );

    const widgetTreeNodeDatas = useAppSelector(
      (state) => state.projectContent.widgetTreeNodeDatas,
    );
    const isDragging = useAppSelector(
      (state) => state.projectContent.isDragging,
    );
    if (!widgetTreeNodeDataBaseIsWidgetTreeNodeData(nodeData)) {
      throw new Error('nodeData is not a WidgetTreeNodeData');
    }
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      if (innerRef.current) {
        return innerRef.current;
      }
      throw new Error('innerRef is not defined');
    });

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
            widgetNodeData={nodeData}
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
      transition: 'outline 0.1s ease-in-out',
      zIndex:
        当前选中的部件包括自身 || isHovered || 当前聚集的部件是自身
          ? isHovered
            ? 2
            : 1
          : undefined,
      position: 'relative', // 搭配 zIndex 生效
      ...(当前选中的部件包括自身 && {
        outline: `2px solid ${token.geekblue6}`,
      }),
      ...(isHovered && {
        outline: `2px solid ${token.gold6}`,
      }),
      ...(当前聚集的部件是自身 && {
        outline: `2px solid ${token.blue6}`,
      }),
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      hoverCurrentNode();
    };

    const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch(
        界面状态仓库模块.slices.projectContent.actions.更新当前鼠标悬停的组件部件key(
          {
            widgetKey: null,
          },
        ),
      );
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
      onDragEnter?.(event);

      if (
        event.currentTarget.contains(event.relatedTarget as Node) &&
        event.currentTarget !== event.relatedTarget
      ) {
        return;
      }

      onDragEnterWithoutInner?.(event);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      onDragLeave?.(event);

      /**
       * 当拖动的元素进入子组件时，onDragLeave 事件会在父组件上触发。
       * 原因是从父组件的角度来看，拖动的元素已经“离开”了父组件的范围，
       * 尽管它只是进入了父组件的一个子组件。
       *
       * 这里为了避免在组件内部的元素进出时触发，需要判断是否在元素内
       */
      if (
        event.currentTarget.contains(event.relatedTarget as Node) &&
        event.currentTarget !== event.relatedTarget
      ) {
        return;
      }

      onDragLeaveWithoutInner?.(event);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      onDragOver?.(event);
    };

    return (
      <div
        ref={mergeRefs(innerRef, (el) => drop(el))}
        style={{
          ...widgetStyle,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onMouseDown={(event) => {
          // 防止最上层 widget 覆盖
          event.stopPropagation();

          dispatch(
            界面状态仓库模块.slices.projectContent.actions.选中某个部件(
              node.key,
            ),
          );
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
            props: nodeData.props,
          },
        )}
      </div>
    );
  },
);
