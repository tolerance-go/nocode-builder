import { insertNodesAtIndex } from '../../misc/insertNodesAtIndex';
import { TreeNode } from '../../types';

export const 批量插入节点 = <T extends TreeNode<T>>(
  nodes: T[],
  parentKey: number | string,
  newNodes: T[],
  position: number = -1, // 默认为-1，表示插入到最后
): boolean => {
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
