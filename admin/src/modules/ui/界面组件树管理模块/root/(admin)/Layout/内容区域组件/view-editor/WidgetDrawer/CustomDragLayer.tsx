import React from 'react';
import { useDragLayer } from 'react-dnd';
import { CardData, CardItem } from './CardItem';
import { theme } from 'antd';

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

  return (
    <div data-test-id="custom-drag-layer" style={layerStyles}>
      <div style={getItemStyles(currentOffset, item.width)}>
        <CardItem item={item} />
      </div>
    </div>
  );
};
