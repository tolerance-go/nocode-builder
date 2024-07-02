import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { ImmerStateCreator } from '@/utils';

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
  projectTreeDataRecord: ProjectTreeNodeDataRecord;
  hasInitProjectTreeDataMeta: boolean;
  selectedProjectStructureTreeNodes: string[];
  expandedKeys: string[];
  editingProjectStructureTreeNode: string | null;
  nodeParentKeyRecord: Record<string, string | null>;
  projectStructureTreeTempNode: string | null;
  containerHeight: number;
};

export type ProjectTreeActions = {
  updateProjectStructureTreeData: (
    data: ProjectStructureTreeDataNode[],
  ) => void;
  updateProjectTreeDataRecord: (data: ProjectTreeNodeDataRecord) => void;
  updateProjectTreeDataRecordItem: (
    key: string,
    data: Partial<Pick<ProjectTreeNodeDataRecordItem, 'title'>>,
  ) => void;
  initProjectTreeDataMeta: (args: {
    projectStructureTreeData: ProjectStructureTreeDataNode[];
    projectStructureTreeDataRecord: ProjectTreeNodeDataRecord;
  }) => void;
  addProjectStructureTreeNode: (
    parentKey: string | null,
    node: ProjectStructureTreeDataNode,
  ) => void;
  insertProjectStructureTreeNode: (
    parentKey: string | null,
    node: ProjectStructureTreeDataNode,
    index: number,
    recordItem: ProjectTreeNodeDataRecord[number],
  ) => void;
  removeProjectStructureTreeNodeWithCheck: (nodeKey: string) => void;
  removeProjectStructureTreeNode: (nodeKey: string) => void;
  moveProjectStructureTreeNode: (
    nodeKey: string,
    newParentKey: string | null,
    newIndex: number,
  ) => void;
  updateSelectedProjectStructureTreeNodes: (nodeKeys: string[]) => void;
  updateExpandedKeys: (keys: string[]) => void;
  updateEditingProjectStructureTreeNode: (key: string) => void;
  updateContainerHeight: (height: number) => void;
  updateProjectStructureTreeTempNode: (key: string | null) => void;
  stopEditingProjectStructureTreeNode: () => void;
  findProjectStructureTreeNode: (
    key: string,
  ) => ProjectStructureTreeDataNode | null;
  insertProjectStructureTreeNodeWithCheck: (
    parentKey: string | null,
    node: ProjectStructureTreeDataNode,
    index: number,
    recordItem: ProjectTreeNodeDataRecord[number],
  ) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set, get) => ({
  containerHeight: 0,
  editingProjectStructureTreeNode: null,
  projectStructureTreeData: [],
  projectTreeDataRecord: {},
  hasInitProjectTreeDataMeta: false,
  selectedProjectStructureTreeNodes: [],
  expandedKeys: [],
  nodeParentKeyRecord: {},
  projectStructureTreeTempNode: null,
  updateProjectTreeDataRecordItem: (key, data) => {
    set((state) => {
      if (data.title) {
        const item = state.projectTreeDataRecord[key];
        if (item) {
          item.title = data.title;
        }
      }
    });
  },
  updateContainerHeight: (height) => {
    set((state) => {
      state.containerHeight = height;
    });
  },
  // 通过key在 projectStructureTreeData 递归查找节点
  updateProjectStructureTreeTempNode: (key) => {
    set((state) => {
      state.projectStructureTreeTempNode = key;
    });
  },
  findProjectStructureTreeNode: (key) => {
    const findNode = (
      nodes: ProjectStructureTreeDataNode[],
    ): ProjectStructureTreeDataNode | null => {
      for (const node of nodes) {
        if (node.key === key) {
          return node;
        }
        if (node.children) {
          const found = findNode(node.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    return findNode(get().projectStructureTreeData);
  },
  updateEditingProjectStructureTreeNode: (key) =>
    set((state) => {
      state.editingProjectStructureTreeNode = key;
    }),
  stopEditingProjectStructureTreeNode: () =>
    set((state) => {
      state.editingProjectStructureTreeNode = null;
    }),
  updateProjectStructureTreeData: (data) => {
    set((state) => {
      state.projectStructureTreeData = data;
    });
  },
  updateProjectTreeDataRecord: (data) => {
    set({ projectTreeDataRecord: data });
  },
  initProjectTreeDataMeta: ({
    projectStructureTreeData,
    projectStructureTreeDataRecord,
  }) => {
    const buildParentKeyMap = (
      nodes: ProjectStructureTreeDataNode[],
      parentKey: string | null = null,
    ): Record<string, string | null> => {
      const map: Record<string, string | null> = {};
      nodes.forEach((node) => {
        map[node.key] = parentKey;
        if (node.children) {
          Object.assign(map, buildParentKeyMap(node.children, node.key));
        }
      });
      return map;
    };

    set(
      (state) => {
        state.projectStructureTreeData = projectStructureTreeData;
        state.projectTreeDataRecord = projectStructureTreeDataRecord;
        state.hasInitProjectTreeDataMeta = true;
        state.nodeParentKeyRecord = buildParentKeyMap(projectStructureTreeData);
      },
      false,
      'initProjectTreeDataMeta',
    );
  },
  // 增加一个节点到projectStructureTreeData
  addProjectStructureTreeNode: (parentKey, node) => {
    set((state) => {
      const addNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            n.children.push(node);
            state.nodeParentKeyRecord[node.key] = parentKey; // 更新父节点关系
            return true;
          }
          if (n.children && addNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      if (parentKey === null) {
        state.projectStructureTreeData.push(node);
        state.nodeParentKeyRecord[node.key] = null; // 根节点的父节点为 null
      } else {
        addNode(state.projectStructureTreeData);
      }
    });
  },
  // 新增方法封装 insertProjectStructureTreeNode，他插入前检查，如果没有展开，先展开
  insertProjectStructureTreeNodeWithCheck: (
    parentKey: string | null,
    node: ProjectStructureTreeDataNode,
    index: number,
    recordItem: ProjectTreeNodeDataRecord[number],
  ) => {
    set((state) => {
      // 检查是否已展开，若未展开则先展开
      if (parentKey !== null && !state.expandedKeys.includes(parentKey)) {
        state.expandedKeys.push(parentKey);
      }
    });
    // 调用 insertProjectStructureTreeNode 方法插入节点
    get().insertProjectStructureTreeNode(parentKey, node, index, recordItem);
  },
  // 插入一个节点到指定位置
  insertProjectStructureTreeNode: (parentKey, node, index, recordItem) => {
    set((state) => {
      let inserted = false;

      const adjustIndex = (
        nodes: ProjectStructureTreeDataNode[],
        idx: number,
      ): number => {
        if (idx === -1) {
          idx = 0;
        } else if (idx === nodes.length) {
          // idx 保持不变，因为 splice 在数组末尾插入元素时不需要调整
        } else if (idx >= 0 && idx < nodes.length) {
          idx = idx + 1;
        }
        return idx;
      };

      const insertNode = (
        nodes: ProjectStructureTreeDataNode[],
        idx: number,
      ): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            idx = adjustIndex(n.children, idx);
            n.children.splice(idx, 0, node);
            state.nodeParentKeyRecord[node.key] = parentKey; // 更新父节点关系
            inserted = true;
            return true;
          }
          if (n.children && insertNode(n.children, idx)) {
            return true;
          }
        }
        return false;
      };

      if (parentKey === null) {
        index = adjustIndex(state.projectStructureTreeData, index);
        state.projectStructureTreeData.splice(index, 0, node);
        state.nodeParentKeyRecord[node.key] = null; // 根节点的父节点为 null
        inserted = true;
      } else {
        insertNode(state.projectStructureTreeData, index);
      }

      if (inserted) {
        state.projectTreeDataRecord[node.key] = recordItem;
      }
    });
  },
  // 新增一个方法，用于删除节点，并判断节点是否处于编辑中
  removeProjectStructureTreeNodeWithCheck: (nodeKey) => {
    // 判断节点是否处于编辑中
    if (get().editingProjectStructureTreeNode === nodeKey) {
      return; // 节点处于编辑中，不进行删除操作
    }
    get().removeProjectStructureTreeNode(nodeKey);
  },
  // 删除projectStructureTreeData中的一个节点
  removeProjectStructureTreeNode: (nodeKey) => {
    let removed: boolean = false;
    set(
      (state) => {
        const removeNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            if (n.key === nodeKey) {
              nodes.splice(i, 1);

              return true;
            }
            if (n.children) {
              return removeNode(n.children);
            }
          }
          return false;
        };

        removed = removeNode(state.projectStructureTreeData);
      },
      false,
      'removeProjectStructureTreeNode',
    );

    if (removed) {
      const removedItem = get().projectTreeDataRecord[nodeKey];

      if (!removedItem) {
        throw new Error('数据不完整。');
      }

      if (removedItem.type == 'file') {
        if (removedItem.id !== -1) {
          // const project = get().findProjectById(removedItem.id);
          // if (!project) {
          //   throw new Error("数据不完整。");
          // }
          // get().addTimelineItemToPool({
          //   tableName: 'project',
          //   createdAt: new Date().toISOString(),
          //   actionName: 'delete',
          //   recordId: removedItem.id,
          // });
        }
      }

      set((state) => {
        delete state.projectTreeDataRecord[nodeKey]; // 同步更改 projectTreeDataRecord
        delete state.nodeParentKeyRecord[nodeKey]; // 删除父节点关系
      });
    }
  },
  moveProjectStructureTreeNode: (nodeKey, newParentKey, newIndex) => {
    set((state) => {
      let nodeToMove: ProjectStructureTreeDataNode | null = null;

      const findAndRemoveNode = (
        nodes: ProjectStructureTreeDataNode[],
      ): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.key === nodeKey) {
            nodeToMove = n;
            nodes.splice(i, 1);
            return true;
          }
          if (n.children && findAndRemoveNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      const insertNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (const n of nodes) {
          if (n.key === newParentKey) {
            n.children = n.children || [];
            n.children.splice(newIndex, 0, nodeToMove!);
            state.nodeParentKeyRecord[nodeKey] = newParentKey; // 更新父节点关系
            return true;
          }
          if (n.children && insertNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      // 找到并移除节点
      findAndRemoveNode(state.projectStructureTreeData);

      if (nodeToMove) {
        if (newParentKey === null) {
          state.projectStructureTreeData.splice(newIndex, 0, nodeToMove);
          state.nodeParentKeyRecord[nodeKey] = null; // 根节点的父节点为 null
        } else {
          insertNode(state.projectStructureTreeData);
        }
      }
    });
  },
  updateSelectedProjectStructureTreeNodes: (nodeKeys) => {
    set((state) => {
      state.selectedProjectStructureTreeNodes = nodeKeys;
    });
  },
  updateExpandedKeys: (keys) => {
    set((state) => {
      state.expandedKeys = keys;
    });
  },
});
