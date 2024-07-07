import { TreeNode } from '../types';
import { insertNodeAtIndex } from './insertNodeAtIndex';

export const insertNode = <T extends TreeNode<T>>(
  nodes: T[],
  parentKey: number | string,
  newNode: T,
  position: number, // 默认为-1，表示插入到最后
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
      const result = insertNode(n.children, parentKey, newNode, position);
      if (result) {
        return result;
      }
    }
  }
  return false;
};
