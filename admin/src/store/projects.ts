import { CustomTreeDataNode } from "@/root/admin/ProjectTree/TreeMenu";
import { getProjectGroups } from "@/services/api/getProjectGroups";
import { getProjects } from "@/services/api/getProjects";
import { proxy } from "valtio";

type TreeNode = {
  key: number;
  title: string;
  children: Array<TreeNode | ProjectLeafNode>;
};

type ProjectLeafNode = {
  key: number;
  title: string;
  isLeaf: true;
};

function buildTree(
  projectGroups: API.ProjectGroupDto[],
  projects: API.ProjectDto[],
): CustomTreeDataNode[] {
  const groupMap: { [key: number]: TreeNode } = {};

  // 初始化所有的 projectGroups 为 TreeNode
  projectGroups.forEach((group) => {
    groupMap[group.id] = {
      key: group.id,
      title: group.name,
      children: [],
    };
  });

  // 构建嵌套的 group 结构
  const tree: TreeNode[] = [];
  projectGroups.forEach((group) => {
    if (group.parentGroupId && groupMap[group.parentGroupId]) {
      groupMap[group.parentGroupId].children.push(groupMap[group.id]);
    } else {
      tree.push(groupMap[group.id]);
    }
  });

  // 将 projects 放到对应的 group 下
  projects.forEach((project) => {
    const projectNode: ProjectLeafNode = {
      key: project.id,
      title: project.name,
      isLeaf: true,
    };
    if (project.projectGroupId && groupMap[project.projectGroupId]) {
      groupMap[project.projectGroupId].children.push(projectNode);
    }
  });

  return tree;
}

const fetchTreeData = async () => {
  const [projects, projectGroups] = await Promise.all([
    getProjects({}),
    getProjectGroups({}),
  ]);
  return buildTree(projectGroups, projects);
};

// 定义状态
export const states = proxy({
  treeData: fetchTreeData(),
  expandedKeys: [] as React.Key[],
  selectedKey: null as React.Key | null,
  addFolderLoading: false,
  addFileLoading: false,
});

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
  newKey: number,
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

export const actions = {
  setTreeData: (newTreeData: CustomTreeDataNode[]) => {
    states.treeData = Promise.resolve(newTreeData);
  },
  setExpandedKeys: (newExpandedKeys: React.Key[]) => {
    states.expandedKeys = newExpandedKeys;
  },
  setSelectedKey: (newSelectedKey: React.Key | null) => {
    states.selectedKey = newSelectedKey;
  },
  addFile: async (parentKey?: React.Key) => {
    const newKey = Date.now();
    const addNode = (
      data: CustomTreeDataNode[],
      parentKey?: React.Key,
    ): CustomTreeDataNode[] => {
      if (!parentKey) {
        const folderIndex = data.findLastIndex((item) => item.children);
        const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
        return [
          ...data.slice(0, insertIndex),
          {
            title: "",
            key: newKey,
            isEditing: true,
            isLeaf: true,
          },
          ...data.slice(insertIndex),
        ];
      }

      let isInserted = false;
      const insertNode = (
        items: CustomTreeDataNode[],
      ): CustomTreeDataNode[] => {
        return items.map((item) => {
          if (item.key === parentKey) {
            const parentFolder = item;
            if (parentFolder.children) {
              if (!states.expandedKeys.includes(parentFolder.key)) {
                actions.setExpandedKeys([
                  ...states.expandedKeys,
                  parentFolder.key,
                ]);
              }
              isInserted = true;
              const indexToInsert = parentFolder.children.findIndex(
                (child) => !child.children,
              );
              const insertIndex =
                indexToInsert === -1
                  ? parentFolder.children.length
                  : indexToInsert;
              const newChildren = [
                ...parentFolder.children.slice(0, insertIndex),
                {
                  title: "",
                  key: newKey,
                  isEditing: true,
                  isLeaf: true,
                },
                ...parentFolder.children.slice(insertIndex),
              ];
              return {
                ...item,
                children: newChildren,
              };
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
        const folderIndex = data.findLastIndex((item) => item.children);
        const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
        return [
          ...data.slice(0, insertIndex),
          {
            title: "",
            key: newKey,
            isEditing: true,
            isLeaf: true,
          },
          ...data.slice(insertIndex),
        ];
      }

      return result;
    };

    actions.setTreeData(
      addNode(await states.treeData, states.selectedKey ?? parentKey),
    );
  },
  addFolder: async (parentKey?: React.Key) => {
    const newKey = Date.now();
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
  handleFinish: async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
    onAdd: (params: {
      parentKey?: React.Key;
      key: React.Key;
      title: string;
    }) => Promise<number>,
    defaultValue: string,
  ) => {
    const value = (e.target as HTMLInputElement).value || defaultValue;
    const parentNode = findParentNode(await states.treeData, key);
    try {
      const result = await onAdd({
        parentKey: parentNode ? parentNode.key : undefined,
        key,
        title: value,
      });
      updateNodeTitle(key, value, result);
    } catch {
      actions.setTreeData(deleteNode(await states.treeData, key));
    }
  },
};

export const projectsStore = {
  actions,
  states,
};
