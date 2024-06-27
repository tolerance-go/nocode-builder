import { ProjectTreeDataNode } from "@/types";
import { proxy } from "valtio";
import { derive } from "derive-valtio";
import { convertProjectTreeToMap } from "./_utils/convertProjectTreeToMap";
import { populateParentMap } from "./_utils/populateParentMap";

export const projectTreeStore = proxy({
  containerHeight: 0,
  expandedKeys: [] as string[],
  treeData: [] as ProjectTreeDataNode[],
});

// 构建 treeMapStore
export const projectTreeMapStore = derive({
  data: (get) => {
    const treeData = get(projectTreeStore).treeData;
    const map = new Map<string, ProjectTreeDataNode>();
    treeData.forEach((node) => convertProjectTreeToMap(node, map));
    return map;
  },
});

// 构建 parentMapStore，用于存储节点的父节点关系
export const projectTreeNodeParentMapStore = derive({
  data: (get) => {
    const treeData = get(projectTreeStore).treeData;
    const parentMap = new Map<string, string | null>();
    treeData.forEach((node) => populateParentMap(node, parentMap));
    return parentMap;
  },
});

export const projectActions = {
  addNode: (parentId: string, newNode: ProjectTreeDataNode) => {
    const parentNode = projectTreeMapStore.data.get(parentId);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(newNode);
    }
  },

  // 删除节点的方法
  removeProject: (nodeKey: string) => {
    // 获取要删除的节点
    const node = projectTreeMapStore.data.get(nodeKey);

    if (node) {
      // 找到父节点的 ID
      const parentId = projectTreeNodeParentMapStore.data.get(nodeKey);

      if (parentId !== null && parentId !== undefined) {
        // 获取父节点
        const parentNode = projectTreeMapStore.data.get(parentId);

        if (parentNode && parentNode.children) {
          // 从父节点的 children 中删除指定元素
          parentNode.children = parentNode.children.filter(
            (child) => child.key !== nodeKey,
          );
        }
      } else {
        // 如果没有父节点，则从根目录中删除
        projectTreeStore.treeData = projectTreeStore.treeData.filter(
          (rootNode) => rootNode.key !== nodeKey,
        );
      }
    }
  },
};
