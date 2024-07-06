import { TreeNode } from '../types';

// 被测试的函数
export const removeNode = (
  nodes: TreeNode[],
  nodeKey: number | string,
): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === nodeKey) {
      nodes.splice(i, 1);
      return true;
    }
    if (n.children) {
      if (removeNode(n.children, nodeKey)) {
        return true;
      }
    }
  }
  return false;
};
