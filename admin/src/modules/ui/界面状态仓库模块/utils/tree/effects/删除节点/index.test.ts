import { TreeNode } from '@/modules/ui/界面状态仓库模块/types/tree-types';
import { removeNode } from '.';
import { describe, it, expect } from 'vitest';

describe('removeNode', () => {
  it('应删除具有给定key的节点并返回删除的节点和原下标位置', () => {
    const tree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: '1-1' },
          { key: '1-2', children: [{ key: '1-2-1' }] },
        ],
      },
      { key: 2 },
    ];

    const result = removeNode(tree, '1-2-1');

    expect(result).toEqual({ removedNode: { key: '1-2-1' }, index: 0 });
    expect(tree).toEqual([
      { key: 1, children: [{ key: '1-1' }, { key: '1-2', children: [] }] },
      { key: 2 },
    ]);
  });

  it('如果具有给定key的节点不存在，应返回null', () => {
    const tree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: '1-1' },
          { key: '1-2', children: [{ key: '1-2-1' }] },
        ],
      },
      { key: 2 },
    ];

    const result = removeNode(tree, 3);

    expect(result).toBe(null);
    expect(tree).toEqual([
      {
        key: 1,
        children: [
          { key: '1-1' },
          { key: '1-2', children: [{ key: '1-2-1' }] },
        ],
      },
      { key: 2 },
    ]);
  });

  it('应删除根级节点并返回删除的节点和原下标位置', () => {
    const tree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: '1-1' },
          { key: '1-2', children: [{ key: '1-2-1' }] },
        ],
      },
      { key: 2 },
    ];

    const result = removeNode(tree, 2);

    expect(result).toEqual({ removedNode: { key: 2 }, index: 1 });
    expect(tree).toEqual([
      {
        key: 1,
        children: [
          { key: '1-1' },
          { key: '1-2', children: [{ key: '1-2-1' }] },
        ],
      },
    ]);
  });
});
