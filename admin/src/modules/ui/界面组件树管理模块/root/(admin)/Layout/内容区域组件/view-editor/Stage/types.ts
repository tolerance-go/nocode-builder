import {
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/ui/界面状态仓库模块';

export interface SlotItemProps {
  style?: React.CSSProperties;
  isDragging: boolean;
  widgetDataNode: WidgetTreeDataNode;
  slotDataNode: WidgetSlotTreeDataNode;
  index: number;
}
