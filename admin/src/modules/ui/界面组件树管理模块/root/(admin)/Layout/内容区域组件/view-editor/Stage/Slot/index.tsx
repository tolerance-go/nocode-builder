import {
  WidgetSlotTreeDataNode,
  WidgetSlotTreeNodeData,
  WidgetTreeNodeData,
} from '@/modules/ui/界面状态仓库模块';
import { Widget } from '../Widget';
import { Placeholder } from './Placeholder';
import { Fragment } from 'react/jsx-runtime';
import { SlotPlaceholderPosition } from './Placeholder/enums';

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
          {node.children.map((child, nodeIndex) => (
            <Fragment key={child.key}>
              {nodeIndex === 0 && (
                <Placeholder
                  isDragging={isDragging}
                  widgetDataNode={widgetDataNode}
                  slotDataNode={slotNodeData}
                  index={0}
                  position={SlotPlaceholderPosition.Split}
                />
              )}
              <Widget node={child} />
              <Placeholder
                isDragging={isDragging}
                widgetDataNode={widgetDataNode}
                slotDataNode={slotNodeData}
                index={nodeIndex + 1}
                position={SlotPlaceholderPosition.Split}
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
          position={SlotPlaceholderPosition.Empty}
        />
      )}
    </>
  );
};
