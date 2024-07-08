import { describe, it, expect } from 'vitest';
import { 过滤掉包含父节点在内的节点 } from './filterNodesWithParentInSet';

describe('过滤包含父节点的节点', () => {
  it('应过滤掉其父节点也在集合中的节点', () => {
    const 节点键集合 = [2, 3, 4, 5];
    const 节点映射关系 = {
      '1': null,
      '2': 1,
      '3': 1,
      '4': null,
      '5': 4,
    };

    const 过滤后的键集合 = 过滤掉包含父节点在内的节点(节点键集合, 节点映射关系);
    expect(过滤后的键集合).toEqual([2, 3, 4]);
  });

  it('应返回原集合，当集合中没有父子关系时', () => {
    const 节点键集合 = [1, 2, 3];
    const 节点映射关系 = {
      '1': null,
      '2': null,
      '3': null,
    };

    const 过滤后的键集合 = 过滤掉包含父节点在内的节点(节点键集合, 节点映射关系);
    expect(过滤后的键集合).toEqual([1, 2, 3]);
  });

  it('应处理空的节点键集合', () => {
    const 节点键集合: (number | string)[] = [];
    const 节点映射关系 = {};

    const 过滤后的键集合 = 过滤掉包含父节点在内的节点(节点键集合, 节点映射关系);
    expect(过滤后的键集合).toEqual([]);
  });

  it('应处理节点映射关系中没有父节点的情况', () => {
    const 节点键集合 = [1, 2, 3];
    const 节点映射关系 = {
      '1': null,
      '2': 1,
      '3': 2,
    };

    const 过滤后的键集合 = 过滤掉包含父节点在内的节点(节点键集合, 节点映射关系);
    expect(过滤后的键集合).toEqual([1]);
  });
});
