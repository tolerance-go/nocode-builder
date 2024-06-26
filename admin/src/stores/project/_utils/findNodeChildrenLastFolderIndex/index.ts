import { CustomTreeDataNode } from "@/types/tree";
import { findNodesLastFolderIndex } from "../findNodesLastFolderIndex";

/**
 * 如何节点子目录中从前到后最后一个文件夹的位置
 */
export const findNodeChildrenLastFolderIndex = (
  node: CustomTreeDataNode,
): number | null => {
  if (!node.children || node.children.length === 0) {
    return -1;
  }

  return findNodesLastFolderIndex(node.children);
};
