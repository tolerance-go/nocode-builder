import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
} from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ProjectTreeStates = {
  projectStructureTreeData: ProjectStructureTreeDataNode[];
  projectTreeDataRecord: ProjectTreeNodeDataRecord;
  hasInitProjectTreeDataMeta: boolean;
};

export type ProjectTreeActions = {
  updateProjectStructureTreeData: (
    data: ProjectStructureTreeDataNode[],
  ) => void;
  updateProjectTreeDataRecord: (data: ProjectTreeNodeDataRecord) => void;
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
  ) => void;
  removeProjectStructureTreeNode: (nodeKey: string) => void;
  moveProjectStructureTreeNode: (
    nodeKey: string,
    newParentKey: string | null,
    newIndex: number,
  ) => void;
};

export type ProjectTreeSlice = ProjectTreeStates & ProjectTreeActions;

export const createProjectTreeSlice: ImmerStateCreator<
  ProjectTreeSlice,
  ProjectTreeSlice
> = (set) => ({
  projectStructureTreeData: [],
  projectTreeDataRecord: {},
  hasInitProjectTreeDataMeta: false,
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
    set((state) => {
      state.projectStructureTreeData = projectStructureTreeData;
      state.projectTreeDataRecord = projectStructureTreeDataRecord;
      state.hasInitProjectTreeDataMeta = true;
    });
  },
  // 增加一个节点到projectStructureTreeData
  addProjectStructureTreeNode: (parentKey, node) => {
    set((state) => {
      const addNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            n.children.push(node);
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
      } else {
        addNode(state.projectStructureTreeData);
      }
    });
  },
  // 插入一个节点到指定位置
  insertProjectStructureTreeNode: (parentKey, node, index) => {
    set((state) => {
      const insertNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            n.children.splice(index, 0, node);
            return true;
          }
          if (n.children && insertNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      if (parentKey === null) {
        state.projectStructureTreeData.splice(index, 0, node);
      } else {
        insertNode(state.projectStructureTreeData);
      }
    });
  },
  // 删除projectStructureTreeData中的一个节点
  removeProjectStructureTreeNode: (nodeKey) => {
    set((state) => {
      const removeNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.key === nodeKey) {
            nodes.splice(i, 1);
            return true;
          }
          if (n.children && removeNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      removeNode(state.projectStructureTreeData);
    });
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
        } else {
          insertNode(state.projectStructureTreeData);
        }
      }
    });
  },
});
