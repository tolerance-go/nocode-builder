import { useAppSelector } from '@/modules/ui/界面状态仓库模块';
import React from 'react';
import { Widget } from './Widget';

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
