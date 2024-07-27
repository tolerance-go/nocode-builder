import { TreeNode } from '@/modules/界面状态仓库模块/types';

interface RemoveResult<T> {
  removedNode: T;
  index: number;
}

export const removeNode = <T extends TreeNode<T>>(
  nodes: T[],
  nodeKey: number | string,
): RemoveResult<T> | null => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === nodeKey) {
      const removedNode = nodes.splice(i, 1)[0];
      return { removedNode, index: i };
    }
    if (n.children) {
      const result = removeNode(n.children as T[], nodeKey);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
