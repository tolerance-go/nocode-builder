import { TreeNode } from '../types';

// 被测试的函数
export const removeNode = (
  nodes: TreeNode[],
  nodeKey: number | string,
): TreeNode | null => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === nodeKey) {
      const removedNode = nodes.splice(i, 1)[0];
      return removedNode;
    }
    if (n.children) {
      const result = removeNode(n.children, nodeKey);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
