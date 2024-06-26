import { CustomTreeDataNode } from "@/types/tree";
import { findNodeChildrenLastFolderIndex } from "../findNodeChildrenLastFolderIndex";
import { findNodeParent } from "../findNodeParent";

export const findNodeSameLevelLastFolderIndex = (
  node: CustomTreeDataNode,
  treeMap: Map<string, CustomTreeDataNode>,
) => {
  const parent = findNodeParent(node, treeMap);

  if (parent) {
    return findNodeChildrenLastFolderIndex(parent) || -1;
  }

  return -1;
};
