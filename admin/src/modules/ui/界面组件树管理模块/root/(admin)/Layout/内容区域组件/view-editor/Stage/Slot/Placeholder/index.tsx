import { WidgetWithLibResponseDto } from '@/_gen/api';
import { WidgetDisplayEnum } from '@/_gen/models';
import { assertEnumValue, mergeRefs } from '@/common/utils';
import {
  useAppSelector,
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { widgetDisplayEnumToCssValue } from '@/modules/ui/界面组件树管理模块/utils';
import { css, keyframes } from '@emotion/css';
import { theme } from 'antd';
import {
  createContext,
  createElement,
  CSSProperties,
  useContext,
  useRef,
  useState,
} from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { ItemType } from '../../../../constants';
import { CardDragItem } from '../../../WidgetDrawer/CardItem';
import { SlotPlaceholderPosition } from './enums';

export interface PlaceholderProps {
  isDragging: boolean;
  widgetDataNode: WidgetTreeDataNode;
  slotDataNode: WidgetSlotTreeDataNode;
  index: number;
  position: SlotPlaceholderPosition;
  onDragEnterWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface SlotStyleContextType {
  getSlotPlaceholderStyle: (options: {
    isOver: boolean;
    position: SlotPlaceholderPosition;
    emptyBorderWidth: number;
  }) => CSSProperties | void;
}

export const SlotStyleContext = createContext<SlotStyleContextType | undefined>(
  undefined,
);

const Cover = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const { token } = theme.useToken();
  return (
    <div
      data-tag="slot-placeholder-cover"
      style={{
        transition: 'background 0.4s',
        position: 'absolute',
        inset: 0,
        background: isCollapsed ? token.blue6 : 'transparent',
        zIndex: 10,
      }}
    ></div>
  );
};

const createFadeInAndExpand = (width: string) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${width};
  }
`;

const useInnerStyle = ({
  isOver,
  position,
  display,
  isCollapsed,
}: {
  display: WidgetDisplayEnum;
  isOver: boolean;
  position: SlotPlaceholderPosition;
  isCollapsed?: boolean;
}): CSSProperties => {
  const { token } = theme.useToken();

  const context = useContext(SlotStyleContext);

  const emptyBorderWidth = 2;

  const style = context?.getSlotPlaceholderStyle({
    isOver,
    position,
    emptyBorderWidth,
  });

  const displayValue = widgetDisplayEnumToCssValue(display);

  const previewCompSize = useAppSelector(
    (state) => state.projectContent.stagePreviewCompSize,
  );

  if (position === SlotPlaceholderPosition.Split) {
    return {
      zIndex: isCollapsed ? undefined : 1, // 让 outline 在同级上层显示
      outline: `2px dashed ${isCollapsed ? 'transparent' : token.blue6}`,
      display: displayValue,
      transition: 'width 0.25s, height 0.25s, outline 0.25s, border 0.25s',
      borderRight: `${isCollapsed ? '4px' : '0px'} solid transparent`,
      borderLeft: `${isCollapsed ? '4px' : '0px'} solid transparent`,
      ...(isCollapsed
        ? {
            width: 4,
            height: previewCompSize?.height,
          }
        : {
            ...previewCompSize,
          }),
      ...style,
    };
  }

  return {
    display: displayValue,
    transition: 'opacity 0.25s, border 0.25s',
    border: `${emptyBorderWidth}px ${isOver ? 'solid' : 'dashed'} ${token.blue6}`,
    opacity: isOver ? 1 : 0.6,
    ...style,
  };
};

const Inner = ({
  widgetData,
  isOver,
  position,
  isCollapsed,
  drop,
  onDragEnterWithoutInner,
  onDragLeaveWithoutInner,
  onDragEnter,
  onDragLeave,
}: {
  widgetData: WidgetWithLibResponseDto;
  isOver: boolean;
  position: SlotPlaceholderPosition;
  isCollapsed?: boolean;
  drop: ConnectDropTarget;
  onDragEnterWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveWithoutInner?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {
  const { 部件组件管理模块 } = 获取模块上下文();
  const slotItemStyle = useInnerStyle({
    isOver,
    position,
    display: assertEnumValue(widgetData.display, WidgetDisplayEnum),
    isCollapsed,
  });

  const innerRef = useRef<HTMLDivElement>(null);

  // 插槽是否拖拽进入过
  const [isDragEntered, setIsDragEntered] = useState(false);

  const defaultProps = 部件组件管理模块.getComponentDefaultProps(
    widgetData.widgetLib.name,
    widgetData.name,
  );

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    onDragEnter?.(event);

    if (
      event.currentTarget.contains(event.relatedTarget as Node) &&
      event.currentTarget !== event.relatedTarget
    ) {
      return;
    }

    onDragEnterWithoutInner?.(event);
    setIsDragEntered(true);
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

  const fadeInAndExpand = createFadeInAndExpand(
    typeof slotItemStyle.width === 'string'
      ? slotItemStyle.width
      : (slotItemStyle.width ?? 0) + 'px',
  );

  const getClassName = () => {
    if (position === SlotPlaceholderPosition.Split) {
      /**
       * animation 和 过渡会有冲突
       */
      return !isDragEntered && isCollapsed
        ? css`
            animation: ${fadeInAndExpand} 0.15s ease-in-out;
          `
        : undefined;
    }
    return undefined;
  };

  return (
    <div
      data-tag="slot-placeholder"
      className={getClassName()}
      ref={mergeRefs((el) => drop(el), innerRef)}
      style={{
        ...slotItemStyle,
        /**
         * 支持 Cover 组件
         */
        position: 'relative',
        overflow: 'hidden',
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {createElement(
        部件组件管理模块.getWidgetComponent(
          widgetData.widgetLib.name,
          widgetData.name,
        ),
        {
          mode: 'stage-preview',
          defaultProps,
        },
      )}
      {position === SlotPlaceholderPosition.Split && (
        <Cover isCollapsed={isCollapsed} />
      )}
    </div>
  );
};

export const Placeholder = ({
  index,
  isDragging,
  widgetDataNode,
  slotDataNode,
  position,
  onDragEnterWithoutInner,
  onDragLeaveWithoutInner,
  onDragEnter,
  onDragLeave,
}: PlaceholderProps) => {
  const { 全局事件系统, 部件组件管理模块 } = 获取模块上下文();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [{ isOver, widgetData }, drop] = useDrop<
    CardDragItem,
    unknown,
    {
      isOver: boolean;
      widgetData?: WidgetWithLibResponseDto;
    }
  >({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      widgetData: monitor.getItem()?.widgetData,
    }),
    drop(item, monitor) {
      const { widgetData } = monitor.getItem();

      setIsCollapsed(true);

      全局事件系统.emit(
        '界面视图管理者/拖动部件弹窗中的组件放置到指定部件的插槽下时',
        {
          被拖动组件Name: item.widgetName,
          被拖动组件的libName: item.widgetLibName,
          目标部件key: widgetDataNode.key,
          目标插槽key: slotDataNode.key,
          目标插槽index: index,
          被拖动组件的display: assertEnumValue(
            widgetData.display,
            WidgetDisplayEnum,
          ),
          被拖动组件的默认props: 部件组件管理模块.getComponentDefaultProps(
            item.widgetLibName,
            item.widgetName,
          ),
        },
      );
    },
  });

  if (!widgetData) {
    return null;
  }

  if (!isDragging) {
    return null;
  }

  return (
    <Inner
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnterWithoutInner={(event) => {
        setIsCollapsed(false);
        onDragEnterWithoutInner?.(event);
      }}
      onDragLeaveWithoutInner={(event) => {
        setIsCollapsed(true);
        onDragLeaveWithoutInner?.(event);
      }}
      widgetData={widgetData}
      isOver={isOver}
      position={position}
      drop={drop}
      isCollapsed={isCollapsed}
    />
  );
};
