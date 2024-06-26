import { createProject } from "@/services/api/createProject";
import { createProjectGroup } from "@/services/api/createProjectGroup";
import { CustomTreeDataNode } from "@/types/tree";
import { setExpandedKeysAction } from "./actions/setExpandedKeys";
import { setTreeDataAction } from "./actions/setTreeData";
import { treeStore } from "./stores";

const findParentNode = (
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
      const parent = findParentNode(item.children, childKey);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};

const findParentFolder = (
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

const updateNodeTitle = async (
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

const deleteNode = (
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

const parseId = (key: string) => {
  return Number(key.split("-")[1]);
};

export const setSelectedKeyAction = (newSelectedKey: React.Key | null) => {
  treeStore.selectedKey = newSelectedKey;
};
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
export const handleFolderFinishAction = async (
  e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
  key: React.Key,
  defaultValue: string,
) => {
  const onAdd = async ({
    title,
    parentKey,
  }: {
    parentKey?: React.Key;
    key: React.Key;
    title: string;
  }) => {
    try {
      treeStore.addFolderLoading = true;
      const result = await createProjectGroup({
        name: title,
        parentGroupId: parentKey as number,
      });
      return result.id;
    } finally {
      treeStore.addFolderLoading = false;
    }
  };
  const value = (e.target as HTMLInputElement).value || defaultValue;
  const parentNode = findParentNode(await treeStore.treeData, key);
  try {
    const result = await onAdd({
      parentKey: parentNode ? parseId(parentNode.key as string) : undefined,
      key,
      title: value,
    });
    updateNodeTitle(key, value, `group-${result}`, result);
  } catch {
    setTreeDataAction(deleteNode(await treeStore.treeData, key));
  }
};
export const handleFileFinishAction = async (
  e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
  key: React.Key,
  defaultValue: string,
) => {
  const onAdd = async ({
    title,
    parentKey,
  }: {
    parentKey?: React.Key;
    key: React.Key;
    title: string;
  }) => {
    try {
      treeStore.addFileLoading = true;
      const result = await createProject({
        name: title,
        projectGroupId: parentKey as number,
      });
      return result.id;
    } finally {
      treeStore.addFileLoading = false;
    }
  };

  const value = (e.target as HTMLInputElement).value || defaultValue;
  const parentNode = findParentNode(await treeStore.treeData, key);
  try {
    const result = await onAdd({
      parentKey: parentNode ? parseId(parentNode.key as string) : undefined,
      key,
      title: value,
    });
    updateNodeTitle(key, value, `project-${result}`, result);
  } catch {
    setTreeDataAction(deleteNode(await treeStore.treeData, key));
  }
};
export const setContainerHeightAction = (h: number) => {
  treeStore.containerHeight = Promise.resolve(h);
};
