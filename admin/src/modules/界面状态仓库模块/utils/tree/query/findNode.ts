import { TreeNode } from '@/modules/界面状态仓库模块/types';

export const findNode = <T extends TreeNode<T>>(
  nodes: T[],
  nodeKey: number | string,
): T | null => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === nodeKey) {
      return n;
    }
    if (n.children) {
      const result = findNode(n.children as T[], nodeKey);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
