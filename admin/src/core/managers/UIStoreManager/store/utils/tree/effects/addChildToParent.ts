import { TreeNode } from '../types';

export function addChildToParent(
  parent: TreeNode | undefined,
  child: TreeNode,
): void {
  if (parent === undefined) {
    throw new Error('Parent node is undefined.');
  }

  if (parent.children === undefined) {
    parent.children = [];
  }

  parent.children.push(child);
}
