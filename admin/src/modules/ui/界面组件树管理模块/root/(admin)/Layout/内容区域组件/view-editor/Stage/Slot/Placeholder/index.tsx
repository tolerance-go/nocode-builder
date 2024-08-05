import {
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { useDrop } from 'react-dnd';
import { ItemType } from '../../../../constants';
import { CardDragItem } from '../../../WidgetDrawer/CardItem';
import { theme } from 'antd';
import { createContext, CSSProperties, useContext } from 'react';
import { SlotPlaceholderPosition } from './enums';

export interface PlaceholderProps {
  style?: React.CSSProperties;
  isDragging: boolean;
  widgetDataNode: WidgetTreeDataNode;
  slotDataNode: WidgetSlotTreeDataNode;
  index: number;
  position: SlotPlaceholderPosition;
}

interface SlotStyleContextType {
  getSlotItemStyle: (options: {
    isDragging: boolean;
    isOver: boolean;
    position: SlotPlaceholderPosition;
  }) => CSSProperties | void;
}

export const SlotStyleContext = createContext<SlotStyleContextType | undefined>(
  undefined,
);

const useSlotItemStyle = ({
  isDragging,
  isOver,
  position,
}: {
  isDragging: boolean;
  isOver: boolean;
  position: SlotPlaceholderPosition;
}): CSSProperties => {
  const { token } = theme.useToken();

  const context = useContext(SlotStyleContext);

  const style = context?.getSlotItemStyle({ isDragging, isOver, position });

  return isDragging
    ? {
        background: token.blue2,
        border: `1px ${isOver ? 'solid' : 'dashed'} ${token.blue6}`,
        height: 20,
        width: 20,
        ...style,
      }
    : {
        display: 'none',
        ...style,
      };
};

export const Placeholder = ({
  style,
  isDragging,
  widgetDataNode,
  slotDataNode,
  position,
}: PlaceholderProps) => {
  const { 全局事件系统 } = 获取模块上下文();

  const [{ isOver }, drop] = useDrop<
    CardDragItem,
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop(item) {
      全局事件系统.emit('界面视图管理者/拖动组件放置到指定部件的插槽下时', {
        被拖动组件Name: item.widgetName,
        被拖动组件的libName: item.widgetLibName,
        目标部件key: widgetDataNode.key,
        目标插槽key: slotDataNode.key,
        目标插槽index: 0,
      });
    },
  });

  const slotItemStyle = useSlotItemStyle({
    isDragging,
    isOver,
    position,
  });

  return (
    <div
      ref={drop}
      style={{
        ...style,
        ...slotItemStyle,
      }}
    ></div>
  );
};
