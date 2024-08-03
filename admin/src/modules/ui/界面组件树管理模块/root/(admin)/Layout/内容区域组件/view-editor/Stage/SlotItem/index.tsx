import { WidgetTreeDataNode } from '@/modules/ui/界面状态仓库模块';
import { Widget } from '../Widget';

export interface SlotItemProps {
  node: WidgetTreeDataNode;
}

export const SlotItem: React.FC<SlotItemProps> = ({ node }) => {
  return (
    <div>
      <Widget node={node} />
    </div>
  );
};
