import { ProjectStructureTreeDataNode } from "@/types";

// 辅助函数：将树结构转换为 Map
export const convertProjectTreeToMap = (
  node: ProjectStructureTreeDataNode,
  map: Map<string, ProjectStructureTreeDataNode>,
) => {
  map.set(node.key, node);
  if (node.children) {
    node.children.forEach((child) => convertProjectTreeToMap(child, map));
  }
  return map;
};
