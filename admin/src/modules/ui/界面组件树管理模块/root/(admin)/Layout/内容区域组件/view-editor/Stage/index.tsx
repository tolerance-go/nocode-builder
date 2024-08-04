import { useAppSelector } from '@/modules/ui/界面状态仓库模块';
import React, { useRef } from 'react';
import { Widget } from './Widget';
import { 组件标识 } from '@/common/constants';
import { theme } from 'antd';

export const Stage: React.FC = () => {
  const widgetTree = useAppSelector((state) => state.projectContent.widgetTree);
  const { token } = theme.useToken();
  const stageRef = useRef<HTMLDivElement>(null);

  const getStageHeight = () => {
    return stageRef.current ? stageRef.current.offsetHeight : 0;
  };

  return (
    <div
      id={组件标识.Stage}
      ref={stageRef}
      style={{
        height: '100%',
        overflow: 'auto',
        backgroundColor: token.colorBgBase,
        position: 'relative',
      }}
    >
      {widgetTree.map((node) => (
        <Widget key={node.key} node={node} getStageHeight={getStageHeight} />
      ))}
    </div>
  );
};
