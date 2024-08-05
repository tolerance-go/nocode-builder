import {
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
  WidgetTreeNodeData,
} from '@/modules/ui/界面状态仓库模块';
import { Widget } from '../Widget';
import { Placeholder } from './Placeholder';
import { Fragment } from 'react/jsx-runtime';

export type SlotProps = {
  node: WidgetSlotTreeDataNode;
  isDragging: boolean;
  widgetDataNode: WidgetTreeNodeData;
  slotNodeData: WidgetSlotTreeNodeData;
};

export const Slot = ({
  node,
  isDragging,
  widgetDataNode,
  slotNodeData,
}: SlotProps) => {
  return (
    <>
      {node.children?.length ? (
        <>
          <Placeholder
            isDragging={isDragging}
            widgetDataNode={widgetDataNode}
            slotDataNode={slotNodeData}
            index={0}
          />
          {node.children.map((child, nodeIndex) => (
            <Fragment key={child.key}>
              <Widget node={child} />
              <Placeholder
                isDragging={isDragging}
                widgetDataNode={widgetDataNode}
                slotDataNode={slotNodeData}
                index={nodeIndex + 1}
              />
            </Fragment>
          ))}
        </>
      ) : (
        <Placeholder
          isDragging={isDragging}
          widgetDataNode={widgetDataNode}
          slotDataNode={slotNodeData}
          index={0}
        />
      )}
    </>
  );
};
