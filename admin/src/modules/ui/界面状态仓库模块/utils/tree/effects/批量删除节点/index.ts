import { ViewKey } from '@/common/types';
import { TreeNode } from '@/modules/ui/界面状态仓库模块/types';

interface BatchRemoveResult<T> {
  removedNodes: T[];
  indices: number[];
  updatedNodes: T[]; // 新增的返回值
}

export const 批量删除节点 = <T extends TreeNode<T>>(
  nodes: T[],
  nodeKeys: ViewKey[],
): BatchRemoveResult<T> => {
  const removedNodes: T[] = [];
  const indices: number[] = [];
  const nodeKeySet = new Set(nodeKeys);

  /**
   * 广度优先的遍历
   */
  const traverse = (nodes: T[], parent: T | null = null): void => {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (nodeKeySet.has(n.key)) {
        removedNodes.push(n);
        indices.push(i);
        if (parent) {
          if (!parent.children) {
            throw new Error('数据不完整，准备删除的节点父级子数据不存在');
          }
          parent.children.splice(i, 1);
        } else {
          nodes.splice(i, 1);
        }
      } else if (n.children) {
        traverse(n.children as T[], n);
      }
    }
  };

  traverse(nodes);

  return {
    removedNodes: removedNodes.reverse(),
    indices: indices.reverse(),
    updatedNodes: nodes, // 返回删除后的节点数组
  };
};
