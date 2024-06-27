import { getProjectTreeData } from "@/services/getProjectTreeData";
import { ProjectTreeDataNode } from "@/types";
import { isNotNullOrUndefined, isNullOrUndefined } from "@/utils";
import {
  projectTreeState,
  projectTreeMapState,
  projectTreeNodeParentMapState,
} from "../states";

export * from "./compareProjectTreeAction";

export const loadTreeDataAction = async () => {
  try {
    projectTreeState.loading = true;
    const treeData = await getProjectTreeData();
    projectTreeState.treeData.value.data = treeData;
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

export const findParentNodeOrThrow = (key: string) => {
  const parentKey = projectTreeNodeParentMapState.data.get(key);
  if (typeof parentKey === "string") {
    return projectTreeMapState.data.get(parentKey);
  }
  return parentKey;
};

export const insertNodeAction = (
  nodes: ProjectTreeDataNode[],
  newNode: ProjectTreeDataNode,
  index: number,
) => {
  // 调整 index 值
  if (index === -1) {
    // 如果 index 是 -1，则插入到开头
    index = 0;
  } else if (index === nodes.length) {
    // 如果 index 是 nodes.length，则插入到最后
    // 这里的 index 保持不变，因为 splice 在数组末尾插入元素时不需要调整
  } else if (index >= 0 && index < nodes.length) {
    // 如果 index 在有效范围内，则插入到 index 后面
    index = index + 1;
  }

  // 插入新节点
  nodes.splice(index, 0, newNode);
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

    insertNodeAction(parentNode.children, newNode, index);
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
      projectTreeState.treeData.value.data = projectTreeState.treeData.value.data.filter(
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
