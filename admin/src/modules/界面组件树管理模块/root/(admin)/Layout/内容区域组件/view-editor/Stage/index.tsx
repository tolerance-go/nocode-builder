import React, { ReactNode } from 'react';
import {
  useAppSelector,
  WidgetSlotTreeDataNode,
  WidgetTreeDataNode,
} from '@/modules/界面状态仓库模块';

interface WidgetProps {
  node: WidgetTreeDataNode;
}

interface SlotProps {
  node: WidgetSlotTreeDataNode;
}

const Widget: React.FC<WidgetProps> = ({ node }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '5px' }}>
      <h3>{node.title as ReactNode}</h3>
      <p>Widget内容</p>
      {node.children && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((child) => (
            <Slot key={child.key} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Slot: React.FC<SlotProps> = ({ node }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '5px' }}>
      <h4>{node.title as ReactNode}</h4>
      <p>Slot内容</p>
      {node.children && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((child) => (
            <Widget key={child.key} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Stage: React.FC = () => {
  const widgetTree = useAppSelector((state) => state.projectContent.widgetTree);
  return (
    <div>
      {widgetTree.map((node) => (
        <Widget key={node.key} node={node} />
      ))}
    </div>
  );
};
