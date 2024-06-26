import { CustomTreeDataNode } from "@/types/tree";
import { treeStore } from "../stores";
import { setExpandedKeysAction } from "./setExpandedKeys";
import { setTreeDataAction } from "./setTreeData";
import { findParentFolder } from "./utils/common";

export const addFolderAction = async (parentKey?: React.Key) => {
  const newKey = `group-${Date.now()}`;
  const addNode = (
    data: CustomTreeDataNode[],
    parentKey?: React.Key,
  ): CustomTreeDataNode[] => {
    if (!parentKey) {
      return [
        {
          title: "",
          key: newKey,
          isEditing: true,
          children: [],
          id: -1,
        },
        ...data,
      ];
    }

    let isInserted = false;
    const insertNode = (items: CustomTreeDataNode[]): CustomTreeDataNode[] => {
      return items.map((item) => {
        if (item.key === parentKey) {
          if (item.children) {
            if (!treeStore.expandedKeys.includes(item.key)) {
              setExpandedKeysAction([...treeStore.expandedKeys, item.key]);
            }
            isInserted = true;
            return {
              ...item,
              children: [
                {
                  title: "",
                  key: newKey,
                  isEditing: true,
                  children: [],
                  id: -1,
                },
                ...item.children,
              ],
            };
          } else {
            const parentFolder = findParentFolder(data, parentKey);
            if (parentFolder) {
              isInserted = true;
              if (!treeStore.expandedKeys.includes(parentFolder.key)) {
                setExpandedKeysAction([
                  ...treeStore.expandedKeys,
                  parentFolder.key,
                ]);
              }
              parentFolder.children = [
                {
                  title: "",
                  key: newKey,
                  isEditing: true,
                  children: [],
                  id: -1,
                },
                ...(parentFolder.children || []),
              ];
            }
          }
        }
        if (item.children && !isInserted) {
          return {
            ...item,
            children: insertNode(item.children),
          };
        }
        return item;
      });
    };

    const result = insertNode(data);

    if (!isInserted) {
      return [
        {
          title: "",
          key: newKey,
          isEditing: true,
          children: [],
          id: -1,
        },
        ...data,
      ];
    }

    return result;
  };

  setTreeDataAction(
    addNode(await treeStore.treeData, treeStore.selectedKey ?? parentKey),
  );
};
