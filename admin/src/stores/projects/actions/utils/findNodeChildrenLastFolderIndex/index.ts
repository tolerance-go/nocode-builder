import { CustomTreeDataNode } from "@/types/tree";

/**
 * 如何节点子目录中从前到后最后一个文件夹的位置
 */
export const findNodeChildrenLastFolderIndex = (
  node: CustomTreeDataNode,
): number | null => {
  if (!node.children || node.children.length === 0) {
    return null;
  }

  for (let i = node.children.length - 1; i >= 0; i--) {
    if (node.children[i].children) {
      return i;
    }
  }

  return null;
};
