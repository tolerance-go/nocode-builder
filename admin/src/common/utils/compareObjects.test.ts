import { describe, it, expect } from 'vitest';
import { compareObjects } from './compareObjects';

describe('compareObjects 函数测试', () => {
  it('应检测新增和删除的键', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      e: 4,
    };

    const obj2 = {
      a: 1,
      b: {
        c: 2,
        f: 5,
      },
      g: 6,
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([['b', 'f'], ['g']]);
    expect(result.removed).toEqual([['b', 'd'], ['e']]);
    expect(result.changed).toEqual([]);
  });

  it('应检测相同键的类型变化', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const obj2 = {
      a: '1', // 类型变化
      b: {
        c: 2,
        d: '3', // 类型变化
      },
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.changed).toEqual([['a'], ['b', 'd']]);
  });

  it('应处理具有混合更改的嵌套对象', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    const obj2 = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: '3', // 类型变化
          f: 4, // 新增字段
        },
        g: 5, // 新增字段
      },
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([
      ['b', 'd', 'f'],
      ['b', 'g'],
    ]);
    expect(result.removed).toEqual([]);
    expect(result.changed).toEqual([['b', 'd', 'e']]);
  });

  it('应正确检测删除的键', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      e: 4,
    };

    const obj2 = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([['b', 'd'], ['e']]);
    expect(result.changed).toEqual([]);
  });

  it('应忽略 null 与其他类型之间的变化', () => {
    const obj1 = {
      a: 1,
      b: null,
    };

    const obj2 = {
      a: 1,
      b: null,
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.changed).toEqual([]); // b 的值是 null，类型不视为变化
  });

  it('应忽略 null 与对象之间的变化', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const obj2 = {
      a: 1,
      b: null, // b 从对象变为 null
    };

    const result = compareObjects(obj1, obj2);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.changed).toEqual([]); // b 的值是 null，类型不视为变化
  });
});
