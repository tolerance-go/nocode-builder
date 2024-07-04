import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { insertNodeAtIndex } from '../../utils/tree/effects';

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

const initialState: ProjectTreeStates = {
  projectStructureTreeData: [],
  projectTreeDataRecord: {},
  hasInitProjectTreeDataMeta: false,
  selectedProjectStructureTreeNodes: [],
  expandedKeys: [],
  editingProjectStructureTreeNode: null,
  nodeParentKeyRecord: {},
  projectStructureTreeTempNode: null,
  containerHeight: 0,
};

const projectTreeSlice = createSlice({
  name: 'projectTree',
  initialState,
  reducers: {
    updateProjectStructureTreeData: (
      state,
      action: PayloadAction<ProjectStructureTreeDataNode[]>,
    ) => {
      state.projectStructureTreeData = action.payload;
    },
    updateProjectTreeDataRecord: (
      state,
      action: PayloadAction<ProjectTreeNodeDataRecord>,
    ) => {
      state.projectTreeDataRecord = action.payload;
    },
    updateProjectTreeDataRecordItem: (
      state,
      action: PayloadAction<{
        key: string;
        data: Partial<Pick<ProjectTreeNodeDataRecordItem, 'title'>>;
      }>,
    ) => {
      const { key, data } = action.payload;
      if (data.title) {
        const item = state.projectTreeDataRecord[key];
        if (item) {
          item.title = data.title;
        }
      }
    },
    initProjectTreeDataMeta: (
      state,
      action: PayloadAction<{
        projectStructureTreeData: ProjectStructureTreeDataNode[];
        projectStructureTreeDataRecord: ProjectTreeNodeDataRecord;
      }>,
    ) => {
      const { projectStructureTreeData, projectStructureTreeDataRecord } =
        action.payload;
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

      state.projectStructureTreeData = projectStructureTreeData;
      state.projectTreeDataRecord = projectStructureTreeDataRecord;
      state.hasInitProjectTreeDataMeta = true;
      state.nodeParentKeyRecord = buildParentKeyMap(projectStructureTreeData);
    },
    addProjectStructureTreeNode: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
      }>,
    ) => {
      const { parentKey, node } = action.payload;
      const addNode = (nodes: ProjectStructureTreeDataNode[]): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            n.children.push(node);
            state.nodeParentKeyRecord[node.key] = parentKey;
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
        state.nodeParentKeyRecord[node.key] = null;
      } else {
        addNode(state.projectStructureTreeData);
      }
    },
    insertProjectStructureTreeNode: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
        index: number;
        recordItem: ProjectTreeNodeDataRecord[number];
      }>,
    ) => {
      const { parentKey, node, index, recordItem } = action.payload;
      let inserted = false;

      const insertNode = (
        nodes: ProjectStructureTreeDataNode[],
        idx: number,
      ): boolean => {
        for (const n of nodes) {
          if (n.key === parentKey) {
            n.children = n.children || [];
            insertNodeAtIndex(n.children, idx, node);
            return true;
          }
          if (n.children && insertNode(n.children, idx)) {
            return true;
          }
        }
        return false;
      };

      if (parentKey === null) {
        insertNodeAtIndex(state.projectStructureTreeData, index, node);
        state.nodeParentKeyRecord[node.key] = null;
        inserted = true;
      } else {
        inserted = insertNode(state.projectStructureTreeData, index);
        if (inserted) {
          state.nodeParentKeyRecord[node.key] = parentKey;
        }
      }

      if (inserted) {
        state.projectTreeDataRecord[node.key] = recordItem;
      }
    },
    updateContainerHeight: (state, action: PayloadAction<number>) => {
      state.containerHeight = action.payload;
    },
    updateProjectStructureTreeTempNode: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.projectStructureTreeTempNode = action.payload;
    },
    updateEditingProjectStructureTreeNode: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.editingProjectStructureTreeNode = action.payload;
    },
    stopEditingProjectStructureTreeNode: (state) => {
      state.editingProjectStructureTreeNode = null;
    },
    removeProjectStructureTreeNodeWithCheck: (
      state,
      action: PayloadAction<string>,
    ) => {
      const nodeKey = action.payload;
      if (state.editingProjectStructureTreeNode !== nodeKey) {
        state.editingProjectStructureTreeNode = null;
      }
    },
    removeProjectStructureTreeNode: (state, action: PayloadAction<string>) => {
      const nodeKey = action.payload;
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

      const removed = removeNode(state.projectStructureTreeData);

      if (removed) {
        delete state.projectTreeDataRecord[nodeKey];
        delete state.nodeParentKeyRecord[nodeKey];
      }
    },
    moveProjectStructureTreeNode: (
      state,
      action: PayloadAction<{
        nodeKey: string;
        newParentKey: string | null;
        newIndex: number;
      }>,
    ) => {
      const { nodeKey, newParentKey, newIndex } = action.payload;
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
            state.nodeParentKeyRecord[nodeKey] = newParentKey;
            return true;
          }
          if (n.children && insertNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      findAndRemoveNode(state.projectStructureTreeData);

      if (nodeToMove) {
        if (newParentKey === null) {
          state.projectStructureTreeData.splice(newIndex, 0, nodeToMove);
          state.nodeParentKeyRecord[nodeKey] = null;
        } else {
          insertNode(state.projectStructureTreeData);
        }
      }
    },
    updateSelectedProjectStructureTreeNodes: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedProjectStructureTreeNodes = action.payload;
    },
    updateExpandedKeys: (state, action: PayloadAction<string[]>) => {
      state.expandedKeys = action.payload;
    },
    insertProjectStructureTreeNodeWithCheck: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
        index: number;
        recordItem: ProjectTreeNodeDataRecord[number];
      }>,
    ) => {
      const { parentKey, node, index, recordItem } = action.payload;
      if (parentKey !== null && !state.expandedKeys.includes(parentKey)) {
        state.expandedKeys.push(parentKey);
      }
      projectTreeSlice.caseReducers.insertProjectStructureTreeNode(state, {
        payload: { parentKey, node, index, recordItem },
        type: 'insertProjectStructureTreeNode',
      });
    },
  },
});

export const {
  updateProjectStructureTreeData,
  updateProjectTreeDataRecord,
  updateProjectTreeDataRecordItem,
  initProjectTreeDataMeta,
  addProjectStructureTreeNode,
  insertProjectStructureTreeNode,
  updateContainerHeight,
  updateProjectStructureTreeTempNode,
  updateEditingProjectStructureTreeNode,
  stopEditingProjectStructureTreeNode,
  removeProjectStructureTreeNodeWithCheck,
  removeProjectStructureTreeNode,
  moveProjectStructureTreeNode,
  updateSelectedProjectStructureTreeNodes,
  updateExpandedKeys,
  insertProjectStructureTreeNodeWithCheck,
} = projectTreeSlice.actions;

export const projectTreeReducer = projectTreeSlice.reducer;
