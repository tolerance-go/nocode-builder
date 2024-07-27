import { describe, it, expect } from 'vitest';
import { insertNodesAtIndex } from '.';
import { TreeNode } from '../../../../../界面状态仓库模块/types/tree-types';

describe('insertNodesAtIndex', () => {
  it('应该在指定索引处插入一个节点', () => {
    const nodes: TreeNode[] = [
      { key: 1, children: [] },
      { key: 3, children: [] },
    ];
    const newNode: TreeNode = { key: 2, children: [] };

    insertNodesAtIndex(nodes, 1, [newNode]);

    expect(nodes).toEqual([
      { key: 1, children: [] },
      { key: 2, children: [] },
      { key: 3, children: [] },
    ]);
  });

  it('应该在指定索引处插入多个节点', () => {
    const nodes: TreeNode[] = [
      { key: 1, children: [] },
      { key: 4, children: [] },
    ];
    const newNodes: TreeNode[] = [
      { key: 2, children: [] },
      { key: 3, children: [] },
    ];

    insertNodesAtIndex(nodes, 1, newNodes);

    expect(nodes).toEqual([
      { key: 1, children: [] },
      { key: 2, children: [] },
      { key: 3, children: [] },
      { key: 4, children: [] },
    ]);
  });

  it('如果索引为 0 应该在开头插入节点', () => {
    const nodes: TreeNode[] = [
      { key: 3, children: [] },
      { key: 4, children: [] },
    ];
    const newNodes: TreeNode[] = [
      { key: 1, children: [] },
      { key: 2, children: [] },
    ];

    insertNodesAtIndex(nodes, 0, newNodes);

    expect(nodes).toEqual([
      { key: 1, children: [] },
      { key: 2, children: [] },
      { key: 3, children: [] },
      { key: 4, children: [] },
    ]);
  });

  it('如果索引为数组长度应该在末尾插入节点', () => {
    const nodes: TreeNode[] = [
      { key: 1, children: [] },
      { key: 2, children: [] },
    ];
    const newNodes: TreeNode[] = [
      { key: 3, children: [] },
      { key: 4, children: [] },
    ];

    insertNodesAtIndex(nodes, 2, newNodes);

    expect(nodes).toEqual([
      { key: 1, children: [] },
      { key: 2, children: [] },
      { key: 3, children: [] },
      { key: 4, children: [] },
    ]);
  });

  it('应该在索引超出范围时报错', () => {
    const nodes: TreeNode[] = [
      { key: 1, children: [] },
      { key: 2, children: [] },
    ];
    const newNodes: TreeNode[] = [{ key: 3, children: [] }];

    expect(() => insertNodesAtIndex(nodes, 3, newNodes)).toThrowError(
      'Index out of bounds.',
    );
    expect(() => insertNodesAtIndex(nodes, -1, newNodes)).toThrowError(
      'Index out of bounds.',
    );
  });
});
