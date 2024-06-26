import { CustomTreeDataNode } from "@/types/tree";

export const findParentNode = (
  data: CustomTreeDataNode[],
  childKey: React.Key,
): CustomTreeDataNode | null => {
  for (const item of data) {
    if (
      item.children &&
      item.children.some((child) => child.key === childKey)
    ) {
      return item;
    }
    if (item.children) {
      const parent = findParentNode(item.children, childKey);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};
