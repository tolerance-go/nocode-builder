import { describe, it, expect } from 'vitest';
import { TreeNode } from '../types';
import { addChildToParent } from './addChildToParent';

describe('addChildToParent', () => {
  it('应该在父节点的子节点数组的末尾添加一个子节点', () => {
    const parent: TreeNode = { key: 1, children: [] };
    const child: TreeNode = { key: 2 };

    addChildToParent(parent, child);

    expect(parent.children).toEqual([child]);
  });

  it('应该处理已经存在的子节点数组', () => {
    const parent: TreeNode = { key: 1, children: [{ key: 3 }] };
    const child: TreeNode = { key: 4 };

    addChildToParent(parent, child);

    expect(parent.children).toEqual([{ key: 3 }, child]);
  });

  it('应该处理未定义的父节点', () => {
    const parent: TreeNode | undefined = undefined;
    const child: TreeNode = { key: 5 };

    // 这里应该抛出错误，我们需要检查是否抛出正确的错误。
    expect(() => addChildToParent(parent, child)).toThrow(Error);
  });
});
