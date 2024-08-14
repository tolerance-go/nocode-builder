export type Point = {
  x: number;
  y: number;
};

export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PositionDescription = {
  position:
    | 'inside'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  distance: number;
};

export function checkPointInOrAroundRectangle(
  point: Point,
  rect: Rectangle,
  surroundingMargin: number = 0,
): PositionDescription | false {
  const topLeftCorner = { x: rect.x, y: rect.y };
  const topRightCorner = { x: rect.x + rect.width, y: rect.y };
  const bottomLeftCorner = { x: rect.x, y: rect.y + rect.height };
  const bottomRightCorner = { x: rect.x + rect.width, y: rect.y + rect.height };

  function calculateDistance(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  let position: PositionDescription['position'] | null = null;
  let distance: number = 0;

  if (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  ) {
    position = 'inside';
    distance = 0;
  } else if (point.x < rect.x && point.y < rect.y) {
    position = 'top-left';
    distance = calculateDistance(point, topLeftCorner);
  } else if (point.x > rect.x + rect.width && point.y < rect.y) {
    position = 'top-right';
    distance = calculateDistance(point, topRightCorner);
  } else if (point.x < rect.x && point.y > rect.y + rect.height) {
    position = 'bottom-left';
    distance = calculateDistance(point, bottomLeftCorner);
  } else if (point.x > rect.x + rect.width && point.y > rect.y + rect.height) {
    position = 'bottom-right';
    distance = calculateDistance(point, bottomRightCorner);
  } else if (
    point.y < rect.y &&
    point.x >= rect.x &&
    point.x <= rect.x + rect.width
  ) {
    position = 'top';
    distance = rect.y - point.y;
  } else if (
    point.y > rect.y + rect.height &&
    point.x >= rect.x &&
    point.x <= rect.x + rect.width
  ) {
    position = 'bottom';
    distance = point.y - (rect.y + rect.height);
  } else if (
    point.x < rect.x &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  ) {
    position = 'left';
    distance = rect.x - point.x;
  } else if (
    point.x > rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  ) {
    position = 'right';
    distance = point.x - (rect.x + rect.width);
  }

  if (position && distance <= surroundingMargin) {
    return { position, distance };
  } else {
    return false;
  }
}
