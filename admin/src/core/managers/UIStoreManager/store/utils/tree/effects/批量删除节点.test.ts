import { TreeNode } from '../types';
import { 批量删除节点 } from './批量删除节点';
import { describe, it, expect } from 'vitest';

const generateTreeData = (depth: number, breadth: number): TreeNode[] => {
  const generateNodes = (currentDepth: number): TreeNode[] => {
    if (currentDepth > depth) return [];

    return Array.from({ length: breadth }, (_, i) => ({
      key: `${currentDepth}-${i}`,
      children: generateNodes(currentDepth + 1),
    }));
  };

  return generateNodes(1);
};

describe('批量删除节点', () => {
  it('应批量删除指定的节点', () => {
    const nodes: TreeNode[] = [
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ];

    const nodeKeys = ['2', '3', '5'];
    const result = 批量删除节点(nodes, nodeKeys);

    expect(result.removedNodes).toEqual([
      { key: '2', children: [] },
      { key: '3', children: [] },
      { key: '5', children: [] },
    ]);

    expect(nodes).toEqual([
      { key: '1', children: [] },
      { key: '4', children: [] },
    ]);
  });

  it('应返回删除节点的索引', () => {
    const nodes: TreeNode[] = [
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ];

    const nodeKeys = ['2', '3', '5'];
    const result = 批量删除节点(nodes, nodeKeys);

    expect(result.indices).toEqual([0, 1, 0]);
  });

  it('应处理没有匹配节点的情况', () => {
    const nodes: TreeNode[] = [
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ];

    const nodeKeys = ['6', '7', '8'];
    const result = 批量删除节点(nodes, nodeKeys);

    expect(result.removedNodes).toEqual([]);
    expect(result.indices).toEqual([]);
    expect(nodes).toEqual([
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ]);
  });

  it('应处理空的节点列表', () => {
    const nodes: TreeNode[] = [];

    const nodeKeys = ['1', '2', '3'];
    const result = 批量删除节点(nodes, nodeKeys);

    expect(result.removedNodes).toEqual([]);
    expect(result.indices).toEqual([]);
    expect(nodes).toEqual([]);
  });

  it('应处理空的键列表', () => {
    const nodes: TreeNode[] = [
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ];

    const nodeKeys: string[] = [];
    const result = 批量删除节点(nodes, nodeKeys);

    expect(result.removedNodes).toEqual([]);
    expect(result.indices).toEqual([]);
    expect(nodes).toEqual([
      {
        key: '1',
        children: [
          { key: '2', children: [] },
          { key: '3', children: [] },
        ],
      },
      { key: '4', children: [{ key: '5', children: [] }] },
    ]);
  });

  it('应测试大规模数据集的遍历效率', () => {
    const largeNodes = generateTreeData(4, 4); // 深度为4，广度为4的树结构
    const nodeKeys = largeNodes.flatMap(
      (node) => node.children?.map((child) => child.key) || [],
    );

    const start = performance.now();
    批量删除节点(largeNodes, nodeKeys);
    const end = performance.now();

    console.log(`批量删除节点操作耗时: ${end - start} ms`);
    expect(end - start).toBeLessThan(1000); // 希望在大规模数据集下操作耗时小于1000ms
  });
});
