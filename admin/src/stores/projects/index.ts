import { CustomTreeDataNode } from "@/root/admin/ProjectTree/TreeMenu";
import { createProject } from "@/services/api/createProject";
import { createProjectGroup } from "@/services/api/createProjectGroup";
import { addFile } from "./actions/addFile";
import { states } from "./states";
import { setExpandedKeys } from "./actions/setExpandedKeys";
import { setTreeData } from "./actions/setTreeData";

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
) => {
  const updateNode = (data: CustomTreeDataNode[]): CustomTreeDataNode[] => {
    return data.map((item) => {
      if (item.key === key) {
        return { ...item, key: newKey, title, isEditing: false };
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
  actions.setTreeData(updateNode(await states.treeData));
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

export const actions = {
  setTreeData,
  setExpandedKeys,
  setSelectedKey: (newSelectedKey: React.Key | null) => {
    states.selectedKey = newSelectedKey;
  },
  addFile,
  addFolder: async (parentKey?: React.Key) => {
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
          },
          ...data,
        ];
      }

      let isInserted = false;
      const insertNode = (
        items: CustomTreeDataNode[],
      ): CustomTreeDataNode[] => {
        return items.map((item) => {
          if (item.key === parentKey) {
            if (item.children) {
              if (!states.expandedKeys.includes(item.key)) {
                actions.setExpandedKeys([...states.expandedKeys, item.key]);
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
                  },
                  ...item.children,
                ],
              };
            } else {
              const parentFolder = findParentFolder(data, parentKey);
              if (parentFolder) {
                isInserted = true;
                if (!states.expandedKeys.includes(parentFolder.key)) {
                  actions.setExpandedKeys([
                    ...states.expandedKeys,
                    parentFolder.key,
                  ]);
                }
                parentFolder.children = [
                  {
                    title: "",
                    key: newKey,
                    isEditing: true,
                    children: [],
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
          },
          ...data,
        ];
      }

      return result;
    };

    actions.setTreeData(
      addNode(await states.treeData, states.selectedKey ?? parentKey),
    );
  },
  handleFolderFinish: async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
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
        projectsStore.states.addFolderLoading = true;
        const result = await createProjectGroup({
          name: title,
          parentGroupId: parentKey as number,
        });
        return result.id;
      } finally {
        projectsStore.states.addFolderLoading = false;
      }
    };
    const value = (e.target as HTMLInputElement).value || defaultValue;
    const parentNode = findParentNode(await states.treeData, key);
    try {
      const result = await onAdd({
        parentKey: parentNode ? parseId(parentNode.key as string) : undefined,
        key,
        title: value,
      });
      updateNodeTitle(key, value, `group-${result}`);
    } catch {
      actions.setTreeData(deleteNode(await states.treeData, key));
    }
  },
  handleFileFinish: async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
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
        projectsStore.states.addFileLoading = true;
        const result = await createProject({
          name: title,
          projectGroupId: parentKey as number,
        });
        return result.id;
      } finally {
        projectsStore.states.addFileLoading = false;
      }
    };

    const value = (e.target as HTMLInputElement).value || defaultValue;
    const parentNode = findParentNode(await states.treeData, key);
    try {
      const result = await onAdd({
        parentKey: parentNode ? parseId(parentNode.key as string) : undefined,
        key,
        title: value,
      });
      updateNodeTitle(key, value, `project-${result}`);
    } catch {
      actions.setTreeData(deleteNode(await states.treeData, key));
    }
  },
  setContainerHeight: (h: number) => {
    states.containerHeight = Promise.resolve(h);
  },
};

export const projectsStore = {
  actions,
  states,
};
