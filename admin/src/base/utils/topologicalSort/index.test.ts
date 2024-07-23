import { describe, it, expect } from 'vitest';
import { topologicalSort } from '.';

describe('topologicalSort', () => {
  it('应该排序没有依赖关系的模块', () => {
    const modules = new Set(['a', 'b', 'c']);
    const dependencies = new Map<string, Set<string>>();

    const result = topologicalSort(
      modules,
      (module) => dependencies.get(module) || new Set([]),
    );

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('应该排序具有线性依赖关系的模块', () => {
    const modules = new Set(['a', 'b', 'c']);
    const dependencies = new Map<string, Set<string>>([
      ['b', new Set(['a'])],
      ['c', new Set(['b'])],
    ]);

    const result = topologicalSort(
      modules,
      (module) => dependencies.get(module) || new Set([]),
    );

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('应该排序具有分支依赖关系的模块', () => {
    const modules = new Set(['a', 'b', 'c', 'd']);
    const dependencies = new Map<string, Set<string>>([
      ['b', new Set(['a'])],
      ['c', new Set(['a'])],
      ['d', new Set(['b', 'c'])],
    ]);

    const result = topologicalSort(
      modules,
      (module) => dependencies.get(module) || new Set([]),
    );

    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('应该检测循环依赖', () => {
    const modules = new Set(['a', 'b']);
    const dependencies = new Map<string, Set<string>>([
      ['a', new Set(['b'])],
      ['b', new Set(['a'])],
    ]);

    expect(() =>
      topologicalSort(
        modules,
        (module) => dependencies.get(module) || new Set([]),
      ),
    ).toThrow('Circular dependency detected');
  });
});
