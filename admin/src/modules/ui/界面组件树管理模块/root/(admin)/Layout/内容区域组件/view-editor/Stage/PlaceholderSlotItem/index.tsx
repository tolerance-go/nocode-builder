import { useDrop } from 'react-dnd';
import { useSlotItemStyle } from '../hooks';
import { SlotItemProps } from '../types';
import { SlotPlaceholderPosition } from './enums';
import { ItemType } from '../../../constants';
import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { CardDragItem } from '../../WidgetDrawer/CardItem';

export interface PlaceholderSlotItemProps extends SlotItemProps {
  position: SlotPlaceholderPosition;
}

export const PlaceholderSlotItem = ({
  style,
  isDragging,
  widgetDataNode,
  slotDataNode,
}: PlaceholderSlotItemProps) => {
  const slotItemStyle = useSlotItemStyle({
    isDragging,
  });

  const { 全局事件系统 } = 获取模块上下文();

  const [, drop] = useDrop<
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
