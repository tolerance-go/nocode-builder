import type { TreeDataNode } from "antd";

// 根据输入内容和树数据查找应该展开的节点数组
export const getExpandedKeys = (
  value: string,
  tree: TreeDataNode[]
): React.Key[] => {
  const expandedKeys = new Set<React.Key>();

  const searchTree = (nodes: TreeDataNode[], parentKeys: React.Key[]) => {
    nodes.forEach((node) => {
      if (typeof node.title === "string" && node.title.includes(value)) {
        parentKeys.forEach((key) => expandedKeys.add(key));
        expandedKeys.add(node.key);
      }
      if (node.children) {
        searchTree(node.children, [...parentKeys, node.key]);
      }
    });
  };

  searchTree(tree, []);
  return Array.from(expandedKeys);
};
