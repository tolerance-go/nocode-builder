import { TreeNode } from '../types';

interface BatchRemoveResult<T> {
  removedNodes: T[];
  indices: number[];
}

export const 批量删除节点 = <T extends TreeNode<T>>(
  nodes: T[],
  nodeKeys: (number | string)[],
): BatchRemoveResult<T> => {
  const removedNodes: T[] = [];
  const indices: number[] = [];

  const nodeKeySet = new Set(nodeKeys);

  const traverse = (nodes: T[], parent: T[] | null = null): void => {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (nodeKeySet.has(n.key)) {
        removedNodes.push(n);
        indices.push(i);
        if (parent) {
          parent.splice(i, 1);
        } else {
          nodes.splice(i, 1);
        }
      } else if (n.children) {
        traverse(n.children, n.children);
      }
    }
  };

  traverse(nodes);

  return { removedNodes: removedNodes.reverse(), indices: indices.reverse() };
};
