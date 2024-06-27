import { derive } from "derive-valtio";
import { proxy } from "valtio";

export const treeStore = proxy<{
  data: Node[];
}>({
  data: [
    {
      id: 0,
      name: "root",
      children: [
        {
          id: 1,
          name: "child1",
        },
        {
          id: 2,
          name: "child2",
          children: [
            {
              id: 3,
              name: "child2-1",
            },
            {
              id: 4,
              name: "child2-2",
            },
          ],
        },
      ],
    },
  ],
});

type Node = {
  id: number;
  name: string;
  children?: Node[];
};

// 辅助函数：将树结构转换为 Map
const convertTreeToMap = (node: Node, map: Map<number, Node>) => {
  map.set(node.id, node);
  if (node.children) {
    node.children.forEach((child) => convertTreeToMap(child, map));
  }
  return map;
};

// 构建 treeMapStore
export const treeMapStore = derive({
  data: (get) => {
    const treeData = get(treeStore).data;
    const map = new Map<number, Node>();
    treeData.forEach((node) => convertTreeToMap(node, map));
    return map;
  },
});

// 辅助函数：递归遍历树结构，填充 parentMap
const populateParentMap = (
  node: Node,
  parentMap: Map<number, number | null>,
  parentId: number | null = null,
) => {
  parentMap.set(node.id, parentId);
  if (node.children) {
    node.children.forEach((child) =>
      populateParentMap(child, parentMap, node.id),
    );
  }
  return parentMap;
};

// 构建 parentMapStore，用于存储节点的父节点关系
export const parentMapStore = derive({
  data: (get) => {
    const treeData = get(treeStore).data;
    const parentMap = new Map<number, number | null>();
    treeData.forEach((node) => populateParentMap(node, parentMap));
    return parentMap;
  },
});

export const addNodeAction = (parentId: number, newNode: Node) => {
  const parentNode = treeMapStore.data.get(parentId);
  if (parentNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newNode);
  }
};

export const updateNodeAction = (nodeId: number, newName: string) => {
  const node = treeMapStore.data.get(nodeId);
  if (node) {
    node.name = newName;
  }
};

// 删除节点的方法
export const removeNodeAction = (nodeId: number) => {
  // 获取要删除的节点
  const node = treeMapStore.data.get(nodeId);

  if (node) {
    // 找到父节点的 ID
    const parentId = parentMapStore.data.get(nodeId);

    if (parentId !== null && parentId !== undefined) {
      // 获取父节点
      const parentNode = treeMapStore.data.get(parentId);

      if (parentNode && parentNode.children) {
        // 从父节点的 children 中删除指定元素
        parentNode.children = parentNode.children.filter(
          (child) => child.id !== nodeId,
        );
      }
    } else {
      // 如果没有父节点，则从根目录中删除
      treeStore.data = treeStore.data.filter(
        (rootNode) => rootNode.id !== nodeId,
      );
    }
  }
};
