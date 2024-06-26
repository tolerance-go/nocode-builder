import { CustomTreeDataNode } from "@/types/tree";
import { findNodeParent } from "../findNodeParent";
import { findNodeChildrenLastFolderIndex } from "../findNodeChildrenLastFolderIndex";

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
