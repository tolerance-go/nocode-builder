import { WidgetTreeDataNode } from '@/modules/ui/界面状态仓库模块';
import { useDrop } from 'react-dnd';
import { useSlotItemStyle } from '../hooks';
import { SlotItemProps } from '../types';
import { Widget } from '../Widget';
import { ItemType } from '../../../constants';

export interface ElementSlotItemProps extends SlotItemProps {
  node: WidgetTreeDataNode;
}

// 元素插槽
export const ElementSlotItem: React.FC<ElementSlotItemProps> = ({
  node,
  style,
  isDragging,
}) => {
  const [, drop] = useDrop({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotItemStyle = useSlotItemStyle({
    isDragging,
  });

  return (
    <div
      ref={drop}
      style={{
        ...style,
        ...slotItemStyle,
      }}
    >
      <Widget node={node} />
    </div>
  );
};
