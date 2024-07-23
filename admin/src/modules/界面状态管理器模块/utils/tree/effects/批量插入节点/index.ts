import { TreeNode } from '@/modules/界面状态管理器模块/types';
import { insertNodesAtIndex } from '../../misc';

export const 批量插入节点 = <T extends TreeNode<T>>(
  nodes: T[],
  parentKey: number | string | null,
  newNodes: T[],
  position: number,
): boolean => {
  // 如果 parentKey 为 null，则在 nodes 里面插入
  if (parentKey === null) {
    insertNodesAtIndex(nodes, position, newNodes);
    return true;
  }

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === parentKey) {
      if (!n.children) {
        n.children = [];
      }
      insertNodesAtIndex(n.children, position, newNodes);
      return true;
    }
    if (n.children) {
      const result = 批量插入节点(n.children, parentKey, newNodes, position);
      if (result) {
        return result;
      }
    }
  }
  return false;
};
