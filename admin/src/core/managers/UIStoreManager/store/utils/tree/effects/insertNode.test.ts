import { describe, it, expect } from 'vitest';
import { TreeNode } from '../types';
import { insertNode } from './insertNode';

describe('insertNode', () => {
  it('应该将节点插入到正确的父节点并返回 true', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: 2, children: [] },
          { key: 3, children: [] },
        ],
      },
    ];
    const newNode: TreeNode = { key: 4, children: [] };
    const result = insertNode(initialTree, 2, newNode, 0);
    expect(result).toBe(true);
    expect(initialTree[0].children![0].children).toContain(newNode);
  });

  it('应该在指定位置插入节点并返回 true', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: 2, children: [{ key: 5, children: [] }] },
          { key: 3, children: [] },
        ],
      },
    ];
    const newNode: TreeNode = { key: 4, children: [] };
    const result = insertNode(initialTree, 2, newNode, 1);
    expect(result).toBe(true);
    expect(initialTree[0].children![0].children![1]).toBe(newNode);
  });

  it('如果父节点不存在应该返回 false', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
        children: [
          { key: 2, children: [] },
          { key: 3, children: [] },
        ],
      },
    ];
    const newNode: TreeNode = { key: 5, children: [] };
    const result = insertNode(initialTree, 999, newNode, 0);
    expect(result).toBe(false);
  });

  it('如果父节点没有 children 数组应该创建一个新的 children 数组并返回 true', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
      },
    ];
    const newNode: TreeNode = { key: 6, children: [] };
    const result = insertNode(initialTree, 1, newNode, 0);
    expect(result).toBe(true);
    expect(initialTree[0].children).toContain(newNode);
  });

  it('当 position 为负数时应该抛出错误', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
        children: [{ key: 2, children: [] }],
      },
    ];
    const newNode: TreeNode = { key: 4, children: [] };
    expect(() => insertNode(initialTree, 2, newNode, -1)).toThrow(
      'Index out of bounds.',
    );
  });

  it('当 position 超出范围时应该抛出错误', () => {
    const initialTree: TreeNode[] = [
      {
        key: 1,
        children: [{ key: 2, children: [] }],
      },
    ];
    const newNode: TreeNode = { key: 4, children: [] };
    expect(() => insertNode(initialTree, 2, newNode, 10)).toThrow(
      'Index out of bounds.',
    );
  });
});
