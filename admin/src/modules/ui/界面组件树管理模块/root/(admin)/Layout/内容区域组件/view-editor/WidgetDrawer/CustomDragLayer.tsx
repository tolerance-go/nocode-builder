import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { generateDefaultProps } from '@/modules/ui/界面组件树管理模块/utils';
import { theme } from 'antd';
import React, { createElement, useEffect, useRef, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import { CardDragItem } from './CardItem';
import { useAppDispatch } from '@/modules/ui/界面状态仓库模块';
import { HTMLComponent } from '@/modules/ui/部件组件管理模块';

const getItemStyles = (
  currentOffset: { x: number; y: number } | null,
): React.CSSProperties => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  return {
    position: 'absolute',
    top: y,
    left: x,
    opacity: 0.5,
  };
};

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer<{
    item: CardDragItem;
    itemType: string | symbol | null;
    currentOffset: { x: number; y: number } | null;
    isDragging: boolean;
  }>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { token } = theme.useToken();
  const compRef = useRef<HTMLElement>(null);
  const { 部件组件管理模块 } = 获取模块上下文();
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  const {
    界面状态仓库模块: {
      slices: { projectContent },
    },
  } = 获取模块上下文();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (compRef.current) {
      const { offsetWidth: width, offsetHeight: height } = compRef.current;
      setSize({ width, height });
    }
  }, [isDragging]);

  useEffect(() => {
    dispatch(projectContent.actions.更新预览组件尺寸(size));
  }, [dispatch, projectContent.actions, size]);

  if (!isDragging) {
    return null;
  }

  const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: token.zIndexPopupBase + 2,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  };

  const defaultProps = generateDefaultProps(item.widgetData.props);

  return (
    <div data-test-id="custom-drag-layer" style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        {createElement(
          部件组件管理模块.getWidgetComponent(
            item.widgetLibName,
            item.widgetName,
          ) as HTMLComponent<HTMLElement>,
          {
            mode: 'preview',
            defaultProps,
            ref: compRef,
          },
        )}
      </div>
    </div>
  );
};
