import { useAppSelector } from '@/modules/ui/界面状态仓库模块';
import React, { useRef, useEffect, useState } from 'react';
import { Widget } from './Widget';
import { 组件标识 } from '@/common/constants';
import { theme } from 'antd';
import { StageHeightContext } from '@/common/contexts';

export const Stage: React.FC = () => {
  const widgetTree = useAppSelector((state) => state.projectContent.widgetTree);
  const { token } = theme.useToken();
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageHeight, setStageHeight] = useState(0);

  useEffect(() => {
    const updateStageHeight = () => {
      if (stageRef.current) {
        setStageHeight(stageRef.current.scrollHeight);
      }
    };

    updateStageHeight();

    // 如果 widgetTree 发生变化，更新舞台高度
    const observer = new MutationObserver(updateStageHeight);
    if (stageRef.current) {
      observer.observe(stageRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [widgetTree]);

  return (
    <StageHeightContext.Provider value={stageHeight}>
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
          <Widget key={node.key} node={node} />
        ))}
      </div>
    </StageHeightContext.Provider>
  );
};
