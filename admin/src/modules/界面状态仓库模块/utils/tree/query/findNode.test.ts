import { describe, expect, it } from 'vitest';
import { TreeNode } from '../../../../界面状态仓库模块/types/tree-types';
import { findNode } from './findNode';

describe('findNode', () => {
  type CustomNodeData = {
    key: string | number;
    children?: CustomNodeData[];
    name: string;
    value: number;
  };

  const tree: TreeNode<CustomNodeData>[] = [
    {
      key: 1,
      name: 'root',
      value: 0,
      children: [
        { key: '1-1', name: 'child1', value: 10 },
        {
          key: '1-2',
          name: 'child2',
          value: 20,
          children: [{ key: '1-2-1', name: 'child2-1', value: 30 }],
        },
      ],
    },
    { key: 2, name: 'root2', value: 40 },
  ];

  it('应找到具有给定key的节点', () => {
    const result = findNode(tree, '1-2-1');
    expect(result).toEqual({ key: '1-2-1', name: 'child2-1', value: 30 });
  });

  it('如果具有给定key的节点不存在，应返回null', () => {
    const result = findNode(tree, '3');
    expect(result).toBe(null);
  });

  it('应找到根级节点', () => {
    const result = findNode(tree, 2);
    expect(result).toEqual({ key: 2, name: 'root2', value: 40 });
  });
});
