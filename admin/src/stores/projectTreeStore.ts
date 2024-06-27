import { ProjectTreeDataNode } from "@/types";
import { proxy } from "valtio";
import { derive } from "derive-valtio";
import { convertProjectTreeToMap } from "./_utils/convertProjectTreeToMap";
import { populateParentMap } from "./_utils/populateParentMap";
import { getProjectTreeData } from "@/services/getProjectTreeData";
import { isNotNullOrUndefined } from "@/utils";

export const projectTreeState = proxy({
  loading: false,
  containerHeight: 0,
  expandedKeys: [] as string[],
  treeData: [] as ProjectTreeDataNode[],
  selectedKey: null as string | null,
});

// 构建 treeMapStore
export const projectTreeMapState = derive({
  data: (get) => {
    const treeData = get(projectTreeState).treeData;
    const map = new Map<string, ProjectTreeDataNode>();
    treeData.forEach((node) => convertProjectTreeToMap(node, map));
    return map;
  },
});

// 构建 parentMapStore，用于存储节点的父节点关系
export const projectTreeNodeParentMapState = derive({
  data: (get) => {
    const treeData = get(projectTreeState).treeData;
    const parentMap = new Map<string, string | null>();
    treeData.forEach((node) => populateParentMap(node, parentMap));
    return parentMap;
  },
});

export const loadTreeDataAction = async () => {
  try {
    projectTreeState.loading = true;
    const treeData = await getProjectTreeData();
    projectTreeState.treeData = treeData;
  } finally {
    projectTreeState.loading = false;
  }
};

export const addNodeAction = (
  parentId: string,
  newNode: ProjectTreeDataNode,
) => {
  const parentNode = projectTreeMapState.data.get(parentId);
  if (parentNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newNode);
  }
};

// 删除节点的方法
export const removeNodeAction = (nodeKey: string) => {
  // 获取要删除的节点
  const node = projectTreeMapState.data.get(nodeKey);

  if (node) {
    // 找到父节点的 ID
    const parentId = projectTreeNodeParentMapState.data.get(nodeKey);

    if (isNotNullOrUndefined(parentId)) {
      // 获取父节点
      const parentNode = projectTreeMapState.data.get(parentId);

      if (parentNode && parentNode.children) {
        // 从父节点的 children 中删除指定元素
        parentNode.children = parentNode.children.filter(
          (child) => child.key !== nodeKey,
        );
      }
    } else {
      // 如果没有父节点，则从根目录中删除
      projectTreeState.treeData = projectTreeState.treeData.filter(
        (rootNode) => rootNode.key !== nodeKey,
      );
    }
  }
};

export const setExpandedKeysAction = (newExpandedKeys: string[]) => {
  projectTreeState.expandedKeys = newExpandedKeys;
};

export const setSelectedKeyAction = (newSelectedKey: string | null) => {
  projectTreeState.selectedKey = newSelectedKey;
};
