import { TreeNode } from '../types';

export function insertNodeAtIndex(
  nodes: TreeNode[],
  index: number,
  newNode: TreeNode,
): void {
  if (index < 0 || index > nodes.length) {
    throw new Error('Index out of bounds.');
  }

  nodes.splice(index, 0, newNode);
}
