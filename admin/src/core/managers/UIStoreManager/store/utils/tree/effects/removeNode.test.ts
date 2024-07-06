import { TreeNode } from '../types';
import { removeNode } from './removeNode';
import { describe, it, expect } from 'vitest';

describe('removeNode', () => {
  it('应删除具有给定key的节点', () => {
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

    expect(result).toBe(true);
    expect(tree).toEqual([
      { key: 1, children: [{ key: '1-1' }, { key: '1-2', children: [] }] },
      { key: 2 },
    ]);
  });

  it('如果具有给定key的节点不存在，应返回false', () => {
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

    expect(result).toBe(false);
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

  it('应删除根级节点', () => {
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

    expect(result).toBe(true);
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