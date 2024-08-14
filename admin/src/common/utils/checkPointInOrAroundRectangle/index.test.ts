import { describe, it, expect } from 'vitest';
import { Point, Rectangle, checkPointInOrAroundRectangle } from '.';

describe('checkPointInOrAroundRectangle 方法测试', () => {
  it('当点在矩形内部时，应该返回 position: inside', () => {
    const point: Point = { x: 15, y: 15 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect);
    expect(result).toEqual({
      position: 'inside',
    });
  });

  it('当点在矩形左上角的周围时，应该返回 position: top-left', () => {
    const point: Point = { x: 8, y: 8 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'top-left',
    });
  });

  it('当点在矩形右上角的周围时，应该返回 position: top-right', () => {
    const point: Point = { x: 22, y: 8 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'top-right',
    });
  });

  it('当点在矩形左下角的周围时，应该返回 position: bottom-left', () => {
    const point: Point = { x: 8, y: 22 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'bottom-left',
    });
  });

  it('当点在矩形右下角的周围时，应该返回 position: bottom-right', () => {
    const point: Point = { x: 22, y: 22 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'bottom-right',
    });
  });

  it('当点在矩形上方且超出周围区域时，应该返回 position: top', () => {
    const point: Point = { x: 15, y: 2 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'top',
    });
  });

  it('当点在矩形下方且超出周围区域时，应该返回 position: bottom', () => {
    const point: Point = { x: 15, y: 28 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'bottom',
    });
  });

  it('当点在矩形左侧且超出周围区域时，应该返回 position: left', () => {
    const point: Point = { x: 2, y: 15 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'left',
    });
  });

  it('当点在矩形右侧且超出周围区域时，应该返回 position: right', () => {
    const point: Point = { x: 28, y: 15 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual({
      position: 'right',
    });
  });

  it('当点不在矩形内部且不在周围区域时，应该返回 false', () => {
    const point: Point = { x: 50, y: 50 };
    const rect: Rectangle = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
    };

    const result = checkPointInOrAroundRectangle(point, rect, 5);
    expect(result).toEqual(false);
  });
});
