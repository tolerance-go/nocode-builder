import { TreeNode } from '@/modules/ui/界面状态仓库模块/types';

export function insertNodeAtIndex<T extends TreeNode<T>>(
  nodes: T[],
  index: number,
  newNode: T,
): void {
  if (index < 0 || index > nodes.length) {
    throw new Error('Index out of bounds.');
  }

  nodes.splice(index, 0, newNode);
}
