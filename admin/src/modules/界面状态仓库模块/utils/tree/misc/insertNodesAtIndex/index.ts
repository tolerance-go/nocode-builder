import { TreeNode } from '@/modules/界面状态仓库模块/types';

export function insertNodesAtIndex<T extends TreeNode<T>>(
  nodes: T[],
  index: number,
  newNodes: T[],
): void {
  if (index < 0 || index > nodes.length) {
    throw new Error('Index out of bounds.');
  }

  nodes.splice(index, 0, ...newNodes);
}
