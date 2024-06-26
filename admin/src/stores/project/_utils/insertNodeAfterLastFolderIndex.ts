import { CustomTreeDataNode } from "@/types";
import { findNodesLastFolderIndex } from "./findNodesLastFolderIndex";
import { insertNodeAfterPosition } from "./insertNodeAfterPosition";

/**
 * 如何在节点数组中的最后一个文件夹之后插入新节点
 */
export const insertNodeAfterLastFolderIndex = (
  nodes: CustomTreeDataNode[],
  newNode: CustomTreeDataNode,
): CustomTreeDataNode[] => {
  const index = findNodesLastFolderIndex(nodes);

  if (index > -1) {
    return insertNodeAfterPosition(nodes, index, newNode);
  }

  return nodes;
};
