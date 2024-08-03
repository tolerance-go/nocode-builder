import { TreeNode } from '@/modules/ui/界面状态仓库模块/types';
import { insertNodeAtIndex } from '../../misc';

export const 插入节点 = <T extends TreeNode<T>>(
  nodes: T[],
  parentKey: number | string,
  newNode: T,
  position: number,
): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.key === parentKey) {
      if (!n.children) {
        n.children = [];
      }
      insertNodeAtIndex(n.children, position, newNode);
      return true;
    }
    if (n.children) {
      const result = 插入节点(n.children, parentKey, newNode, position);
      if (result) {
        return result;
      }
    }
  }
  return false;
};
