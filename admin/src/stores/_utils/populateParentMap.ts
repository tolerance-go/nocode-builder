import { ProjectTreeDataNode } from "@/types";

// 辅助函数：递归遍历树结构，填充 parentMap
export const populateParentMap = (
  node: ProjectTreeDataNode,
  parentMap: Map<string, string | null>,
  parentKey: string | null = null,
) => {
  parentMap.set(node.key, parentKey);
  if (node.children) {
    node.children.forEach((child) =>
      populateParentMap(child, parentMap, node.key),
    );
  }
  return parentMap;
};
