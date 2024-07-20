import { describe, it, expect } from 'vitest';
import { TreeNode } from '../../../../types/tree-types';
import { insertNodeAtIndex } from '.';

describe('insertNodeAtIndex', () => {
  it('应该在指定位置插入新节点', () => {
    const nodes: TreeNode[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const newNode: TreeNode = { key: 4 };

    insertNodeAtIndex(nodes, 1, newNode);

    expect(nodes).toEqual([{ key: 1 }, newNode, { key: 2 }, { key: 3 }]);
  });

  it('应该在数组开头插入新节点', () => {
    const nodes: TreeNode[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const newNode: TreeNode = { key: 4 };

    insertNodeAtIndex(nodes, 0, newNode);

    expect(nodes).toEqual([newNode, { key: 1 }, { key: 2 }, { key: 3 }]);
  });

  it('应该在数组末尾插入新节点', () => {
    const nodes: TreeNode[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const newNode: TreeNode = { key: 4 };

    insertNodeAtIndex(nodes, nodes.length, newNode);

    expect(nodes).toEqual([{ key: 1 }, { key: 2 }, { key: 3 }, newNode]);
  });

  it('应该在数组中间插入新节点', () => {
    const nodes: TreeNode[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const newNode: TreeNode = { key: 4 };

    insertNodeAtIndex(nodes, 1, newNode);

    expect(nodes).toEqual([{ key: 1 }, newNode, { key: 2 }, { key: 3 }]);
  });

  it('应该抛出错误当索引超出范围', () => {
    const nodes: TreeNode[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
    const newNode: TreeNode = { key: 4 };

    // 这里应该抛出错误，我们需要检查是否抛出正确的错误。
    expect(() => insertNodeAtIndex(nodes, -1, newNode)).toThrow(Error);
  });
});
