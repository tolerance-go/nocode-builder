import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { insertNodeAtIndex, removeNode } from '../../utils/tree/effects';
import { TreeNode } from '../../utils/tree/types';

export type ProjectTreeStates = {
  项目节点树: ProjectStructureTreeDataNode[];
  树节点key到节点数据的映射: ProjectTreeNodeDataRecord;
  hasInitProjectTreeDataMeta: boolean;
  所有已经选中的节点: string[];
  所有展开的节点的key: string[];
  当前正在编辑的项目树节点的key: string | null;
  节点到父节点的映射: Record<string, string | null>;
  为了编辑临时创建的节点的key: string | null;
  节点树容器的高度: number;
  编辑临时创建节点之前选中的节点的keys: string[] | null;
};

const initialState: ProjectTreeStates = {
  项目节点树: [],
  树节点key到节点数据的映射: {},
  hasInitProjectTreeDataMeta: false,
  所有已经选中的节点: [],
  所有展开的节点的key: [],
  当前正在编辑的项目树节点的key: null,
  节点到父节点的映射: {},
  为了编辑临时创建的节点的key: null,
  节点树容器的高度: 0,
  编辑临时创建节点之前选中的节点的keys: null,
};

const projectTreeSlice = createSlice({
  name: 'projectTree',
  initialState,
  reducers: {
    在指定节点下插入新节点并同步更新其他数据: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
        index: number;
        recordItem: ProjectTreeNodeDataRecord[number];
      }>,
    ) => {
      projectTreeSlice.caseReducers.插入节点并且默认展开父节点(state, {
        type: '',
        payload: action.payload,
      });
      projectTreeSlice.caseReducers.更新当前编辑节点是哪个(state, {
        type: '',
        payload: action.payload.node.key,
      });
      projectTreeSlice.caseReducers.更新为了编辑创建的临时节点是哪个(state, {
        type: '',
        payload: action.payload.node.key,
      });
      projectTreeSlice.caseReducers.将选中节点改为临时创建的编辑节点并暂存(
        state,
        {
          type: '',
          payload: action.payload.node.key,
        },
      );
    },
    将选中节点改为临时创建的编辑节点并暂存: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.编辑临时创建节点之前选中的节点的keys = [
        ...state.所有已经选中的节点,
      ];
      state.所有已经选中的节点 = [action.payload];
    },
    取消指定的节点的选中状态: (state, action: PayloadAction<string>) => {
      state.所有已经选中的节点 = state.所有已经选中的节点.filter(
        (key) => key !== action.payload,
      );
    },
    updateProjectStructureTreeData: (
      state,
      action: PayloadAction<ProjectStructureTreeDataNode[]>,
    ) => {
      state.项目节点树 = action.payload;
    },
    updateProjectTreeDataRecord: (
      state,
      action: PayloadAction<ProjectTreeNodeDataRecord>,
    ) => {
      state.树节点key到节点数据的映射 = action.payload;
    },
    更新节点的数据: (
      state,
      action: PayloadAction<{
        key: string;
        data: Partial<Pick<ProjectTreeNodeDataRecordItem, 'title'>>;
      }>,
    ) => {
      const { key, data } = action.payload;
      if (data.title) {
        const item = state.树节点key到节点数据的映射[key];
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

      state.项目节点树 = projectStructureTreeData;
      state.树节点key到节点数据的映射 = projectStructureTreeDataRecord;
      state.hasInitProjectTreeDataMeta = true;
      state.节点到父节点的映射 = buildParentKeyMap(projectStructureTreeData);
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
            state.节点到父节点的映射[node.key] = parentKey;
            return true;
          }
          if (n.children && addNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      if (parentKey === null) {
        state.项目节点树.push(node);
        state.节点到父节点的映射[node.key] = null;
      } else {
        addNode(state.项目节点树);
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
        insertNodeAtIndex(state.项目节点树, index, node);
        state.节点到父节点的映射[node.key] = null;
        inserted = true;
      } else {
        inserted = insertNode(state.项目节点树, index);
        if (inserted) {
          state.节点到父节点的映射[node.key] = parentKey;
        }
      }

      if (inserted) {
        state.树节点key到节点数据的映射[node.key] = recordItem;
      }
    },
    updateContainerHeight: (state, action: PayloadAction<number>) => {
      state.节点树容器的高度 = action.payload;
    },
    更新为了编辑创建的临时节点是哪个: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.为了编辑临时创建的节点的key = action.payload;
    },
    更新当前编辑节点是哪个: (state, action: PayloadAction<string>) => {
      state.当前正在编辑的项目树节点的key = action.payload;
    },
    停止节点编辑状态: (state) => {
      state.当前正在编辑的项目树节点的key = null;
    },
    退出当前正在编辑的节点: (state) => {
      if (state.当前正在编辑的项目树节点的key) {
        if (
          state.当前正在编辑的项目树节点的key ===
          state.为了编辑临时创建的节点的key
        ) {
          projectTreeSlice.caseReducers.删除项目树节点(state, {
            type: '',
            payload: state.当前正在编辑的项目树节点的key,
          });
        } else {
          state.当前正在编辑的项目树节点的key = null;
        }
      }
    },
    删除所有选中的节点: (state) => {
      state.所有已经选中的节点.forEach((nodeKey) => {
        projectTreeSlice.caseReducers.删除项目树节点(state, {
          type: '',
          payload: nodeKey,
        });
      });
    },
    删除项目树节点: (state, action: PayloadAction<string>) => {
      const nodeKey = action.payload;

      const removed = removeNode(state.项目节点树, nodeKey);

      if (removed) {
        const 递归删除所有节点映射及关联状态 = (
          node: TreeNode,
          keyToNodeDataMap: Record<string, unknown>,
          nodeToParentMap: Record<string, unknown>,
        ) => {
          state.所有已经选中的节点 = state.所有已经选中的节点.filter(
            (key) => key !== node.key,
          );
          if (node.key === state.当前正在编辑的项目树节点的key) {
            state.当前正在编辑的项目树节点的key = null;
          }
          if (node.key === state.为了编辑临时创建的节点的key) {
            state.为了编辑临时创建的节点的key = null;
          }

          delete keyToNodeDataMap[node.key];
          delete nodeToParentMap[node.key];

          if (node.children) {
            node.children.forEach((child) => {
              递归删除所有节点映射及关联状态(
                child,
                keyToNodeDataMap,
                nodeToParentMap,
              );
            });
          }
        };

        递归删除所有节点映射及关联状态(
          removed,
          state.树节点key到节点数据的映射,
          state.节点到父节点的映射,
        );
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
            state.节点到父节点的映射[nodeKey] = newParentKey;
            return true;
          }
          if (n.children && insertNode(n.children)) {
            return true;
          }
        }
        return false;
      };

      findAndRemoveNode(state.项目节点树);

      if (nodeToMove) {
        if (newParentKey === null) {
          state.项目节点树.splice(newIndex, 0, nodeToMove);
          state.节点到父节点的映射[nodeKey] = null;
        } else {
          insertNode(state.项目节点树);
        }
      }
    },
    删除某个选中的节点: (state, action: PayloadAction<string>) => {
      state.所有已经选中的节点 = state.所有已经选中的节点.filter(
        (key) => key !== action.payload,
      );
    },
    更新选中的节点是哪些: (state, action: PayloadAction<string[]>) => {
      state.所有已经选中的节点 = action.payload;
    },
    更新展开的节点是哪些: (state, action: PayloadAction<string[]>) => {
      state.所有展开的节点的key = action.payload;
    },
    插入节点并且默认展开父节点: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
        index: number;
        recordItem: ProjectTreeNodeDataRecord[number];
      }>,
    ) => {
      const { parentKey, node, index, recordItem } = action.payload;
      if (
        parentKey !== null &&
        !state.所有展开的节点的key.includes(parentKey)
      ) {
        state.所有展开的节点的key.push(parentKey);
      }
      projectTreeSlice.caseReducers.insertProjectStructureTreeNode(state, {
        payload: { parentKey, node, index, recordItem },
        type: '',
      });
    },
    将当前选中的节点恢复为编辑临时创建节点之前选中的节点的key: (state) => {
      state.所有已经选中的节点 =
        state.编辑临时创建节点之前选中的节点的keys || [];
    },
    更新_编辑临时创建节点之前选中的节点的key_为: (
      state,
      action: PayloadAction<string[] | null>,
    ) => {
      state.编辑临时创建节点之前选中的节点的keys = action.payload;
    },
  },
});

export const {
  退出当前正在编辑的节点,
  取消指定的节点的选中状态,
  在指定节点下插入新节点并同步更新其他数据,
  更新_编辑临时创建节点之前选中的节点的key_为,
  将当前选中的节点恢复为编辑临时创建节点之前选中的节点的key,
  将选中节点改为临时创建的编辑节点并暂存,
  updateProjectStructureTreeData,
  updateProjectTreeDataRecord,
  更新节点的数据,
  initProjectTreeDataMeta,
  addProjectStructureTreeNode,
  insertProjectStructureTreeNode,
  updateContainerHeight,
  更新为了编辑创建的临时节点是哪个,
  更新当前编辑节点是哪个,
  停止节点编辑状态,
  删除所有选中的节点,
  删除项目树节点,
  moveProjectStructureTreeNode,
  更新选中的节点是哪些,
  更新展开的节点是哪些,
  插入节点并且默认展开父节点,
} = projectTreeSlice.actions;

export const projectTreeReducer = projectTreeSlice.reducer;
