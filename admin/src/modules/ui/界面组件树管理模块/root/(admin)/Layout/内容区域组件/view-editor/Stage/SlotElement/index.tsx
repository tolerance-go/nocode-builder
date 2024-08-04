import { WidgetTreeDataNode } from '@/modules/ui/界面状态仓库模块';
import { Widget } from '../Widget';
import { useDrop } from 'react-dnd';
import { SlotProps } from '../types';
import { theme } from 'antd';

export interface SlotElementProps extends SlotProps {
  node: WidgetTreeDataNode;
}

// 定义拖放类型
const ItemType = {
  CARD: 'CARD',
};

// 元素插槽
export const SlotElement: React.FC<SlotElementProps> = ({
  node,
  style,
  isDragging,
}) => {
  const { token } = theme.useToken();
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
        ...(isDragging && {
          background: token.blue2,
          border: `1px solid ${token.blue6}`,
        }),
      }}
    >
      <Widget node={node} />
    </div>
  );
};
