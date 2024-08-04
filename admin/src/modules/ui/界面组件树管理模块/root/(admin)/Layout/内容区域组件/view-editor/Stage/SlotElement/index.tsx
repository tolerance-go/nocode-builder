import { WidgetTreeDataNode } from '@/modules/ui/界面状态仓库模块';
import { Widget } from '../Widget';
import { useDrop } from 'react-dnd';
import { SlotProps } from '../types';

export interface SlotElementProps extends SlotProps {
  node: WidgetTreeDataNode;
  getStageHeight: () => number; // 添加获取高度的方法
}

// 定义拖放类型
const ItemType = {
  CARD: 'CARD',
};

// 元素插槽
export const SlotElement: React.FC<SlotElementProps> = ({
  node,
  style,
  getStageHeight,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        ...style,
        boxSizing: 'border-box',
      }}
    >
      <Widget node={node} getStageHeight={getStageHeight} />
    </div>
  );
};
