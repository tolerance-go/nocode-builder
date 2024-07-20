import { describe, it, expect } from 'vitest';
import { 批量插入节点 } from '.';
import { TreeNode } from '../../../../types/tree-types';

describe('insertNodes', () => {
  it('应该在指定父节点下插入多个节点', () => {
    const nodes: TreeNode[] = [{ key: 1, children: [] }];
    const newNodes: TreeNode[] = [
      { key: 2, children: [] },
      { key: 3, children: [] },
    ];

    const result = 批量插入节点(nodes, 1, newNodes, 0);

    expect(result).toBe(true);
    expect(nodes).toEqual([
      {
        key: 1,
        children: [
          { key: 2, children: [] },
          { key: 3, children: [] },
        ],
      },
    ]);
  });

  it('如果父节点不存在应该返回 false', () => {
    const nodes: TreeNode[] = [{ key: 1, children: [] }];
    const newNodes: TreeNode[] = [
      { key: 2, children: [] },
      { key: 3, children: [] },
    ];

    const result = 批量插入节点(nodes, 'nonexistent', newNodes, 0);

    expect(result).toBe(false);
  });

  it('应该在指定索引插入多个节点', () => {
    const nodes: TreeNode[] = [
      {
        key: 1,
        children: [{ key: 2, children: [] }],
      },
    ];
    const newNodes: TreeNode[] = [
      { key: 3, children: [] },
      { key: 4, children: [] },
    ];

    const result = 批量插入节点(nodes, 1, newNodes, 1);

    expect(result).toBe(true);
    expect(nodes).toEqual([
      {
        key: 1,
        children: [
          { key: 2, children: [] },
          { key: 3, children: [] },
          { key: 4, children: [] },
        ],
      },
    ]);
  });

  it('如果插入位置超出范围应该抛出错误', () => {
    const nodes: TreeNode[] = [
      {
        key: 1,
        children: [{ key: 2, children: [] }],
      },
    ];
    const newNodes: TreeNode[] = [
      { key: 3, children: [] },
      { key: 4, children: [] },
    ];

    expect(() => 批量插入节点(nodes, 1, newNodes, 5)).toThrowError(
      'Index out of bounds.',
    );
  });

  it('如果 parentKey 为 null，应该在 nodes 中插入多个节点', () => {
    const nodes: TreeNode[] = [{ key: 1, children: [] }];
    const newNodes: TreeNode[] = [
      { key: 2, children: [] },
      { key: 3, children: [] },
    ];

    const result = 批量插入节点(nodes, null, newNodes, 1);

    expect(result).toBe(true);
    expect(nodes).toEqual([
      { key: 1, children: [] },
      { key: 2, children: [] },
      { key: 3, children: [] },
    ]);
  });
});
