import { 获取模块上下文 } from '@/modules/ui/界面组件树管理模块/hooks';
import { generateDefaultProps } from '@/modules/ui/界面组件树管理模块/utils';
import { theme } from 'antd';
import React, { createElement } from 'react';
import { useDragLayer } from 'react-dnd';
import { CardData } from './CardItem';

const getItemStyles = (
  currentOffset: { x: number; y: number } | null,
  itemWidth: number | undefined,
): React.CSSProperties => {
  if (!currentOffset || !itemWidth) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  return {
    position: 'absolute',
    top: y,
    left: x,
    width: itemWidth,
    opacity: 0.5,
  };
};

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as CardData & { width?: number },
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { token } = theme.useToken();

  const { 部件组件管理模块 } = 获取模块上下文();

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
      <div style={getItemStyles(currentOffset, item.width)}>
        {createElement(
          部件组件管理模块.getWidgetComponent(
            item.widgetLibName,
            item.widgetName,
          ),
          {
            mode: 'preview',
            defaultProps,
          },
        )}
      </div>
    </div>
  );
};
