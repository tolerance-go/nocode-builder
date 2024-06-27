import { ProjectTreeDataNode } from "@/types";
import { proxy } from "valtio";
import { derive } from "derive-valtio";
import { convertProjectTreeToMap } from "./_utils/convertProjectTreeToMap";
import { populateParentMap } from "./_utils/populateParentMap";
import { getProjectTreeData } from "@/services/getProjectTreeData";
import { isNotNullOrUndefined, isNullOrUndefined } from "@/utils";

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

export const pushChildNodeAction = (
  parentKey: string,
  newNode: ProjectTreeDataNode,
) => {
  const parentNode = projectTreeMapState.data.get(parentKey);
  if (parentNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newNode);
  }
};

export const insertChildNodeAction = (
  parentKey: string,
  newNode: ProjectTreeDataNode,
  index: number,
) => {
  const parentNode = projectTreeMapState.data.get(parentKey);
  if (parentNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }

    // 调整 index 值
    if (index === -1) {
      // 如果 index 是 -1，则插入到开头
      index = 0;
    } else if (index === parentNode.children.length) {
      // 如果 index 是 parentNode.children.length，则插入到最后
      // 这里的 index 保持不变，因为 splice 在数组末尾插入元素时不需要调整
    } else if (index >= 0 && index < parentNode.children.length) {
      // 如果 index 在有效范围内，则插入到 index 后面
      index = index + 1;
    }

    // 插入新节点
    parentNode.children.splice(index, 0, newNode);
  }
};

export const findNodeByKeyOrThrow = (key: string) => {
  const node = projectTreeMapState.data.get(key);
  if (isNullOrUndefined(node)) {
    throw new Error("Invalid key");
  }
  return node;
};

// 删除节点的方法
const removeNodeAction = (nodeKey: string) => {
  // 获取要删除的节点
  const node = projectTreeMapState.data.get(nodeKey);

  if (node) {
    // 找到父节点的 ID
    const parentKey = projectTreeNodeParentMapState.data.get(nodeKey);

    if (isNotNullOrUndefined(parentKey)) {
      // 获取父节点
      const parentNode = projectTreeMapState.data.get(parentKey);

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

export const removeItemAction = (nodeKey: string) => {
  const node = projectTreeMapState.data.get(nodeKey);

  if (node) {
    if (node.isEditing) return;

    removeNodeAction(node.key);
  }
};

// 切换节点的编辑状态
export const startNodeEditingAction = (key: string) => {
  const node = projectTreeMapState.data.get(key);
  if (node) {
    node.isEditing = true;
  }
};

export const stopNodeEditingAction = (key: string) => {
  const node = projectTreeMapState.data.get(key);
  if (node) {
    node.isEditing = false;
  }
};

export const saveNodeAction = (key: string, newTitle: string) => {
  const node = projectTreeMapState.data.get(key);
  if (node) {
    node.title = newTitle;
    stopNodeEditingAction(key);
  }
};

export const setExpandedKeysAction = (newExpandedKeys: string[]) => {
  projectTreeState.expandedKeys = newExpandedKeys;
};

export const setSelectedKeyAction = (newSelectedKey: string | null) => {
  projectTreeState.selectedKey = newSelectedKey;
};
