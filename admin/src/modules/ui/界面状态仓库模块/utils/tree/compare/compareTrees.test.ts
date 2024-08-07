import { describe, expect, it } from 'vitest';
import { TreeNode } from '@/modules/ui/界面状态仓库模块/types/tree-types';
import { DiffResult, compareTrees } from './compareTrees';

export type DataTreeNode = TreeNode<{
  key: string | number;
  title: string;
}>;

describe('compareTrees', () => {
  it('应正确检测新增、删除和移动操作', () => {
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
      新增: [
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
          index: 0,
          recordItems: [{ key: '1-1', children: [] }],
        },
      ],
      新增: [],
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
      新增: [
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
      新增: [],
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
      新增: [],
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
      新增: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理多个节点新增和删除的情况', () => {
    const oldTree: TreeNode[] = [{ key: '1', children: [] }];

    const newTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [] },
      { key: '3', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      新增: [
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

  it('应正确处理嵌套节点的删除，并返回最外层的父节点', () => {
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
      新增: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应在移动操作中返回最外层的节点', () => {
    const oldTree: TreeNode[] = [
      {
        key: '1',
        children: [
          {
            key: '1-1',
            children: [
              { key: '1-1-1', children: [{ key: '1-1-1-1', children: [] }] },
            ],
          },
        ],
      },
    ];

    const newTree: TreeNode[] = [
      {
        key: '1',
        children: [],
      },
      {
        key: '1-1',
        children: [
          { key: '1-1-1', children: [{ key: '1-1-1-1', children: [] }] },
        ],
      },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [
        {
          节点keys: ['1-1'],
          目标父节点key: null,
          index: 1,
          recordItems: [
            {
              key: '1-1',
              children: [
                { key: '1-1-1', children: [{ key: '1-1-1-1', children: [] }] },
              ],
            },
          ],
        },
      ],
      新增: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应在新增操作中返回最外层的节点', () => {
    const oldTree: TreeNode[] = [
      {
        key: '1',
        children: [],
      },
    ];

    const newTree: TreeNode[] = [
      {
        key: '1',
        children: [],
      },
      {
        key: '2',
        children: [{ key: '2-1', children: [{ key: '2-1-1', children: [] }] }],
      },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      新增: [
        {
          节点keys: ['2'],
          父节点key: null,
          index: 1,
          recordItems: [
            {
              key: '2',
              children: [
                { key: '2-1', children: [{ key: '2-1-1', children: [] }] },
              ],
            },
          ],
        },
      ],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确检测更新操作', () => {
    const oldTree: DataTreeNode[] = [
      { key: '1', children: [], title: 'title-1' },
      {
        key: '2',
        children: [],
        title: 'title-2',
      },
    ];

    const newTree: DataTreeNode[] = [
      { key: '1', children: [], title: 'title-1' },
      {
        key: '2',
        children: [],
        title: 'title-2-new',
      },
    ];

    const expected: DiffResult<DataTreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      新增: [],
      更新: [
        {
          节点key: '2',
          oldNode: {
            key: '2',
            title: 'title-2',
            children: [],
          },
          newNode: {
            key: '2',
            title: 'title-2-new',
            children: [],
          },
        },
      ],
    };

    const result = compareTrees(oldTree, newTree, (oldNode, newNode) => {
      return oldNode.title !== newNode.title;
    });
    expect(result).toEqual(expected);
  });

  it('应该检测所有节点更新', () => {
    const oldTree: DataTreeNode[] = [
      { key: '1', children: [], title: 'title-1' },
      {
        key: '2',
        children: [{ key: '2-1', children: [], title: 'title-2-1' }],
        title: 'title-2',
      },
    ];

    const newTree: DataTreeNode[] = [
      { key: '1', children: [], title: 'title-1' },
      {
        key: '2',
        children: [{ key: '2-1', children: [], title: 'title-2-1-new' }],
        title: 'title-2-new',
      },
    ];

    const expected: DiffResult<DataTreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      新增: [],
      更新: [
        {
          节点key: '2',
          oldNode: {
            key: '2',
            title: 'title-2',
            children: [{ key: '2-1', children: [], title: 'title-2-1' }],
          },
          newNode: {
            key: '2',
            title: 'title-2-new',
            children: [{ key: '2-1', children: [], title: 'title-2-1-new' }],
          },
        },
        {
          节点key: '2-1',
          oldNode: { key: '2-1', children: [], title: 'title-2-1' },
          newNode: { key: '2-1', children: [], title: 'title-2-1-new' },
        },
      ],
    };

    const result = compareTrees(
      oldTree,
      newTree,
      (oldNode, newNode): boolean => {
        return oldNode.title !== newNode.title;
      },
    );
    expect(result).toEqual(expected);
  });

  it('应正确处理从空数组到有数据的情况', () => {
    const oldTree: TreeNode[] = [];

    const newTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [] },
    ];

    const expected: DiffResult<TreeNode> = {
      删除: { 节点keys: [], recordItems: [] },
      移动: [],
      新增: [
        {
          父节点key: null,
          index: 0,
          recordItems: [
            { key: '1', children: [] },
            { key: '2', children: [] },
          ],
          节点keys: ['1', '2'],
        },
      ],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });

  it('应正确处理从有数据到空数组的情况', () => {
    const oldTree: TreeNode[] = [
      { key: '1', children: [] },
      { key: '2', children: [] },
    ];

    const newTree: TreeNode[] = [];

    const expected: DiffResult<TreeNode> = {
      删除: {
        节点keys: ['1', '2'],
        recordItems: [
          { key: '1', children: [] },
          { key: '2', children: [] },
        ],
      },
      移动: [],
      新增: [],
    };

    const result = compareTrees(oldTree, newTree);
    expect(result).toEqual(expected);
  });
});
