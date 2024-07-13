import { describe, it, expect } from 'vitest';
import { DiffResult, compareTrees } from './compareTrees';
import { TreeNode } from '../types';

describe('compareTrees', () => {
  it('应正确检测插入、删除和移动操作', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
      { key: '2', children: [] },
    ];

    const newTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
      { key: '3', children: [] },
      { key: '4', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: ['2'], recordItems: [{ key: '2', children: [] }] },
      移动: [],
      插入: [
        {
          父节点key: null,
          index: 1,
          recordItems: [
            { key: '3', children: [] },
            { key: '4', children: [] },
          ],
          节点keys: ['3', '4'],
        },
      ],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确检测节点的移动操作', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
      { key: '2', children: [] },
    ];

    const newTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [{ key: '1-1', children: [] }] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [
        {
          节点keys: ['1-1'],
          目标父节点key: '2',
        },
      ],
      插入: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确检测更新的节点', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
    ];

    const newTree: TreeNode[] = [
      {
        key: '1',
        children: [{ key: '1-1', children: [{ key: '1-1-1', children: [] }] }],
      },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      插入: [
        {
          父节点key: '1-1',
          index: 0,
          recordItems: [{ key: '1-1-1', children: [] }],
          节点keys: ['1-1-1'],
        },
      ],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理空树的情况', () => {
    const oldTree: TreeNode[] = [];
    const newTree: TreeNode[] = [];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      插入: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理完全相同的树', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
      { key: '2', children: [] },
    ];

    const newTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
      { key: '2', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      插入: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理嵌套结构的变化', () => {
    const oldTree: TreeNode[] = [
      {
        key: '1',
        children: [{ key: '1-1', children: [{ key: '1-1-1', children: [] }] }],
      },
    ];

    const newTree: TreeNode[] = [
      { key: '1', children: [{ key: '1-1', children: [] }] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: {
        节点keys: ['1-1-1'],
        recordItems: [{ key: '1-1-1', children: [] }],
      },
      移动: [],
      插入: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理多个节点插入和删除的情况', () => {
    const oldTree: TreeNode[] = [{ key: '1', children: [] }];

    const newTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [] },
      { key: '3', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      插入: [
        {
          父节点key: null,
          index: 1,
          recordItems: [
            { key: '2', children: [] },
            { key: '3', children: [] },
          ],
          节点keys: ['2', '3'],
        },
      ],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理嵌套节点的插入和删除，并返回最外层的父节点', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [] },
      {
        key: '2',
        children: [{ key: '2-1', children: [{ key: '2-1-1', children: [] }] }],
      },
    ];

    const newTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: {
        节点keys: ['2-1'],
        recordItems: [
          { key: '2-1', children: [{ key: '2-1-1', children: [] }] },
        ],
      },
      移动: [],
      插入: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });
});
