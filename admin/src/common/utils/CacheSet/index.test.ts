import { describe, it, expect, vi } from 'vitest';
import { CacheSet } from '.';

describe('CacheSet', () => {
  it('应该正确添加和删除元素', () => {
    const set = new CacheSet<number>();
    set.add(1).add(2);
    expect(set.values()).toEqual([1, 2]);
    expect(set.has(1)).toBe(true);
    expect(set.has(3)).toBe(false);
    set.delete(1);
    expect(set.has(1)).toBe(false);
  });

  it('应该返回集合的大小', () => {
    const set = new CacheSet<number>();
    set.add(1).add(2);
    expect(set.size()).toBe(2);
    set.delete(1);
    expect(set.size()).toBe(1);
  });

  it('应该正确清空集合', () => {
    const set = new CacheSet<number>();
    set.add(1).add(2);
    set.clear();
    expect(set.size()).toBe(0);
    expect(set.values()).toEqual([]);
  });

  it('应该正确查找元素并缓存结果', () => {
    const set = new CacheSet<number>();
    set.add(1).add(2).add(3);

    const predicate1 = vi.fn((item: number) => item > 1);

    const result1 = set.findWithCache(predicate1, 'predicate1');
    expect(result1).toBe(2);
    expect(predicate1).toHaveBeenCalledTimes(2);

    const result2 = set.findWithCache(predicate1, 'predicate1'); // 使用缓存结果
    expect(result2).toBe(2);
    expect(predicate1).toHaveBeenCalledTimes(2); // 没有新的调用

    const predicate2 = vi.fn((item: number) => item > 2);

    const result3 = set.findWithCache(predicate2, 'predicate2');
    expect(result3).toBe(3);
    expect(predicate2).toHaveBeenCalledTimes(3);

    set.add(4); // 修改集合
    const result4 = set.findWithCache(predicate2, 'predicate2'); // 集合变化，重新查找
    expect(result4).toBe(3);
    expect(predicate2).toHaveBeenCalledTimes(6);
  });

  it('应该根据不同的参数缓存结果', () => {
    const set = new CacheSet<number>();
    set.add(1).add(2).add(3);

    const predicate = vi.fn((item: number) => item > 1);

    const result1 = set.findWithCache(predicate, '1');
    expect(result1).toBe(2);
    expect(predicate).toHaveBeenCalledTimes(2);

    const result2 = set.findWithCache(predicate, '2'); // 使用不同参数，重新查找
    expect(result2).toBe(2);
    expect(predicate).toHaveBeenCalledTimes(4);

    const result3 = set.findWithCache(predicate, '1'); // 使用缓存结果
    expect(result3).toBe(2);
    expect(predicate).toHaveBeenCalledTimes(4); // 没有新的调用
  });
});
