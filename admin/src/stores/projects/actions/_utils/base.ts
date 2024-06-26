import { CustomTreeDataNode } from "@/types/tree";
import { treeStore } from "../../stores";
import { setTreeDataAction } from "../setTreeDataAction";

export const parseId = (key: string) => {
  return Number(key.split("-")[1]);
};

export const findParentFolder = (
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
      const parent = findParentFolder(item.children, childKey);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};

export const updateNodeTitle = async (
  key: React.Key,
  title: string,
  newKey: string,
  newId: number,
) => {
  const updateNode = (data: CustomTreeDataNode[]): CustomTreeDataNode[] => {
    return data.map((item) => {
      if (item.key === key) {
        return { ...item, key: newKey, id: newId, title, isEditing: false };
      }
      if (item.children) {
        return {
          ...item,
          children: updateNode(item.children),
        };
      }
      return item;
    });
  };
  setTreeDataAction(updateNode(await treeStore.treeData));
};

export const deleteNode = (
  data: CustomTreeDataNode[],
  key: React.Key,
): CustomTreeDataNode[] => {
  return data
    .filter((item) => item.key !== key)
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: deleteNode(item.children, key),
        };
      }
      return item;
    });
};
