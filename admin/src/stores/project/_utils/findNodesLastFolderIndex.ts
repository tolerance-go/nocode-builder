import { CustomTreeDataNode } from "@/types";

/**
 * 如何在节点数组中找到最后一个文件夹的位置？
 */
export const findNodesLastFolderIndex = (nodes: CustomTreeDataNode[] = []) => {
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].children) {
      return i;
    }
  }
  return -1;
};
