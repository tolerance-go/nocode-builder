import { WidgetWithLibAndPropsResponseDto } from '@/_gen/api';
import { WidgetDisplayEnum } from '@/_gen/models';
import { assertEnumValue } from '@/common/utils';
import mergeRefs from 'merge-refs';
import {
  useAppSelector,
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import {
  generateDefaultProps,
  widgetDisplayEnumToCssValue,
} from '@/modules/ui/界面组件树管理模块/utils';
import { theme } from 'antd';
import {
  createContext,
  createElement,
  CSSProperties,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import { ItemType } from '../../../../constants';
import { CardDragItem } from '../../../WidgetDrawer/CardItem';
import { SlotPlaceholderPosition } from './enums';
import { HTMLComponent } from '@/modules/ui/部件组件管理模块';

export interface PlaceholderProps {
  isDragging: boolean;
  widgetDataNode: WidgetTreeDataNode;
  slotDataNode: WidgetSlotTreeDataNode;
  index: number;
  position: SlotPlaceholderPosition;
  isHoverWidgetAdjacent?: boolean; // 新增的 boolean 属性，用于控制是否为相邻的插槽
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface SlotStyleContextType {
  getSlotPlaceholderStyle: (options: {
    isOver: boolean;
    position: SlotPlaceholderPosition;
  }) => CSSProperties | void;
}

export const SlotStyleContext = createContext<SlotStyleContextType | undefined>(
  undefined,
);

const Cover = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        transition: 'background 0.25s',
        position: 'absolute',
        inset: 0,
        background: isCollapsed ? token.blue8 : 'transparent',
        zIndex: 10,
      }}
    ></div>
  );
};

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

  const style = context?.getSlotPlaceholderStyle({ isOver, position });

  const displayValue = widgetDisplayEnumToCssValue(display);

  const previewCompSize = useAppSelector(
    (state) => state.projectContent.previewCompSize,
  );

  return {
    background: token.blue2,
    border: `2px dashed ${isCollapsed ? 'transparent' : token.blue6}`,
    display: displayValue,
    opacity: !isOver ? 0.5 : 1,
    transition: 'width 0.25s, height 0.25s, border-radius 0.25s, border 0.25s',
    ...(isCollapsed
      ? {
          width: 8,
          borderRadius: 8,
          height: previewCompSize?.height,
          overflow: 'hidden',
        }
      : {
          ...previewCompSize,
          borderRadius: 0,
        }),
    ...style,
  };
};

const Inner = forwardRef<
  HTMLDivElement,
  {
    widgetData: WidgetWithLibAndPropsResponseDto;
    isOver: boolean;
    position: SlotPlaceholderPosition;
    drop: ConnectDropTarget;
    onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
    isCollapsed?: boolean;
  }
>(
  (
    {
      widgetData,
      isOver,
      position,
      isCollapsed,
      drop,
      onDragEnter,
      onDragLeave,
    },
    ref,
  ) => {
    const { 部件组件管理模块 } = 获取模块上下文();
    const slotItemStyle = useInnerStyle({
      isOver,
      position,
      display: assertEnumValue(widgetData.display, WidgetDisplayEnum),
      isCollapsed,
    });

    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      if (innerRef.current) {
        return innerRef.current;
      }
      throw new Error('innerRef is not defined');
    });

    const defaultProps = generateDefaultProps(widgetData.props);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!innerRef.current?.contains(event.relatedTarget as Node)) {
        onDragEnter?.(event);
      }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!innerRef.current?.contains(event.relatedTarget as Node)) {
        onDragLeave?.(event);
      }
    };

    return (
      <div
        ref={mergeRefs((el) => drop(el), innerRef)}
        style={{
          ...slotItemStyle,
          position: 'relative',
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {createElement(
          部件组件管理模块.getWidgetComponent(
            widgetData.widgetLib.name,
            widgetData.name,
          ) as HTMLComponent<HTMLElement>,
          {
            mode: 'preview',
            defaultProps,
          },
        )}
        <Cover isCollapsed={isCollapsed} />
      </div>
    );
  },
);

export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>(
  (
    {
      isDragging,
      widgetDataNode,
      slotDataNode,
      position,
      isHoverWidgetAdjacent,
      onDragEnter,
      onDragLeave,
    },
    ref,
  ) => {
    const { 全局事件系统 } = 获取模块上下文();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [{ isOver, widgetData }, drop] = useDrop<
      CardDragItem,
      unknown,
      {
        isOver: boolean;
        widgetData?: WidgetWithLibAndPropsResponseDto;
      }
    >({
      accept: ItemType.CARD,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        widgetData: monitor.getItem()?.widgetData,
      }),
      drop(item) {
        if (!widgetData) {
          return;
        }
        全局事件系统.emit('界面视图管理者/拖动组件放置到指定部件的插槽下时', {
          被拖动组件Name: item.widgetName,
          被拖动组件的libName: item.widgetLibName,
          目标部件key: widgetDataNode.key,
          目标插槽key: slotDataNode.key,
          目标插槽index: 0,
          被拖动组件的display: assertEnumValue(
            widgetData.display,
            WidgetDisplayEnum,
          ),
        });
      },
    });

    if (!isDragging) {
      return null;
    }

    if (!isHoverWidgetAdjacent && position === SlotPlaceholderPosition.Split) {
      return null;
    }

    if (!widgetData) {
      return null;
    }

    return (
      <Inner
        ref={ref}
        onDragEnter={(event) => {
          setIsCollapsed(false);
          onDragEnter?.(event);
        }}
        onDragLeave={(event) => {
          setIsCollapsed(true);
          onDragLeave?.(event);
        }}
        widgetData={widgetData}
        isOver={isOver}
        position={position}
        drop={drop}
        isCollapsed={isCollapsed}
      />
    );
  },
);
