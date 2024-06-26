import { CustomTreeDataNode } from "@/types/tree";

export const findNodeParent = (
  node: CustomTreeDataNode,
  treeMap: Map<string, CustomTreeDataNode>,
) => {
  return treeMap.get(node.key);
};
