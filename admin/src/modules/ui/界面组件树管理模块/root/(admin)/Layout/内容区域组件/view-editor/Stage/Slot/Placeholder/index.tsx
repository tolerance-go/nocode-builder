import { WidgetWithLibAndPropsResponseDto } from '@/_gen/api';
import { WidgetDisplayEnum } from '@/_gen/models';
import { assertEnumValue } from '@/common/utils';
import {
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import {
  generateDefaultProps,
  widgetDisplayEnumToCssValue,
} from '@/modules/ui/界面组件树管理模块/utils';
import { theme } from 'antd';
import { createContext, createElement, CSSProperties, useContext } from 'react';
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
  isHoverWidgetAdjacent: boolean; // 新增的 boolean 属性，用于控制是否为相邻的插槽
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface SlotStyleContextType {
  getSlotItemStyle: (options: {
    isOver: boolean;
    position: SlotPlaceholderPosition;
  }) => CSSProperties | void;
}

export const SlotStyleContext = createContext<SlotStyleContextType | undefined>(
  undefined,
);

const useSlotItemStyle = ({
  isOver,
  position,
  display,
}: {
  display: WidgetDisplayEnum;
  isOver: boolean;
  position: SlotPlaceholderPosition;
}): CSSProperties => {
  const { token } = theme.useToken();

  const context = useContext(SlotStyleContext);

  const style = context?.getSlotItemStyle({ isOver, position });

  return {
    background: token.blue2,
    border: `1px ${isOver ? 'solid' : 'dashed'} ${token.blue6}`,
    display: widgetDisplayEnumToCssValue(display),
    opacity: !isOver ? 0.5 : 1,
    ...style,
  };
};

const Inner = ({
  widgetData,
  isOver,
  position,
  drop,
  onDragEnter,
  onDragLeave,
}: {
  widgetData: WidgetWithLibAndPropsResponseDto;
  isOver: boolean;
  position: SlotPlaceholderPosition;
  drop: ConnectDropTarget;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
}) => {
  const { 部件组件管理模块 } = 获取模块上下文();
  const slotItemStyle = useSlotItemStyle({
    isOver,
    position,
    display: assertEnumValue(widgetData.display, WidgetDisplayEnum),
  });

  const defaultProps = generateDefaultProps(widgetData.props);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onDragEnter?.(event);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onDragLeave?.(event);
  };

  return (
    <div
      ref={drop}
      style={{
        ...slotItemStyle,
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
          mode: 'preview',
          defaultProps,
        },
      )}
    </div>
  );
};

export const Placeholder = ({
  isDragging,
  widgetDataNode,
  slotDataNode,
  position,
  isHoverWidgetAdjacent,
  onDragEnter,
  onDragLeave,
}: PlaceholderProps) => {
  const { 全局事件系统 } = 获取模块上下文();

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
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      widgetData={widgetData}
      isOver={isOver}
      position={position}
      drop={drop}
    />
  );
};
