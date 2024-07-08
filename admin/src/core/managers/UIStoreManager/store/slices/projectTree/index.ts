import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  insertNode,
  insertNodeAtIndex,
  removeNode,
} from '../../utils/tree/effects';
import { TreeNode } from '../../utils/tree/types';

export type ProjectTreeStates = {
  项目节点树: ProjectStructureTreeDataNode[];
  // 关联数据
  connected_树节点key到节点数据的映射: ProjectTreeNodeDataRecord;
  hasInitProjectTreeDataMeta: boolean;
  所有已经选中的节点: string[];
  所有展开的节点的key: string[];
  当前正在编辑的项目树节点的key: string | null;
  // 派生数据
  derived_节点到父节点的映射: Record<string, string | null>;
  为了编辑临时创建的节点的key: string | null;
  节点树容器的高度: number;
  为了编辑临时创建节点之前选中的节点的key: string[] | null;
  当前输入的标题: string;
  是否选中了项目树容器: boolean;
  激活的节点的key: string | null;
};

const initialState: ProjectTreeStates = {
  激活的节点的key: null,
  当前输入的标题: '',
  项目节点树: [],
  connected_树节点key到节点数据的映射: {},
  hasInitProjectTreeDataMeta: false,
  所有已经选中的节点: [],
  所有展开的节点的key: [],
  当前正在编辑的项目树节点的key: null,
  derived_节点到父节点的映射: {},
  为了编辑临时创建的节点的key: null,
  节点树容器的高度: 0,
  为了编辑临时创建节点之前选中的节点的key: null,
  是否选中了项目树容器: false,
};

const projectTreeSlice = createSlice({
  name: 'projectTree',
  initialState,
  reducers: {
    更新激活的节点的key: (state, action: PayloadAction<string | null>) => {
      state.激活的节点的key = action.payload;
    },
    选中项目树容器: (state) => {
      state.是否选中了项目树容器 = true;
      state.所有已经选中的节点 = [];
    },
    取消选中项目树容器: (state) => {
      state.是否选中了项目树容器 = false;
    },
    清空当前输入的标题: (state) => {
      state.当前输入的标题 = '';
    },
    更新当前输入的标题: (state, action: PayloadAction<string>) => {
      state.当前输入的标题 = action.payload;
    },
    插入新节点在指定节点下并同步更新其他数据: (
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
      projectTreeSlice.caseReducers.更新当前编辑节点是哪个并更新输入框的值(
        state,
        {
          type: '',
          payload: action.payload.node.key,
        },
      );
      projectTreeSlice.caseReducers.更新为了编辑创建的临时节点为(state, {
        type: '',
        payload: action.payload.node.key,
      });
      projectTreeSlice.caseReducers.更新选中节点并将之前的选中节点数据暂存(
        state,
        {
          type: '',
          payload: action.payload.node.key,
        },
      );
    },
    更新选中节点并将之前的选中节点数据暂存: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.为了编辑临时创建节点之前选中的节点的key = [
        ...state.所有已经选中的节点,
      ];
      state.所有已经选中的节点 = [action.payload];
    },
    取消指定的节点的选中状态: (state, action: PayloadAction<string>) => {
      state.所有已经选中的节点 = state.所有已经选中的节点.filter(
        (key) => key !== action.payload,
      );
    },
    更新项目节点树: (
      state,
      action: PayloadAction<ProjectStructureTreeDataNode[]>,
    ) => {
      state.项目节点树 = action.payload;
    },
    更新节点数据映射: (
      state,
      action: PayloadAction<ProjectTreeNodeDataRecord>,
    ) => {
      state.connected_树节点key到节点数据的映射 = action.payload;
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
        const item = state.connected_树节点key到节点数据的映射[key];
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
      state.connected_树节点key到节点数据的映射 =
        projectStructureTreeDataRecord;
      state.hasInitProjectTreeDataMeta = true;
      state.derived_节点到父节点的映射 = buildParentKeyMap(
        projectStructureTreeData,
      );
    },
    插入节点到指定位置: (
      state,
      action: PayloadAction<{
        parentKey: string | null;
        node: ProjectStructureTreeDataNode;
        index: number;
        recordItem: ProjectTreeNodeDataRecord[number];
      }>,
    ) => {
      const { parentKey, node, index, recordItem } = action.payload;
      let inserted: boolean = false;

      if (parentKey === null) {
        insertNodeAtIndex(state.项目节点树, index, node);
        state.derived_节点到父节点的映射[node.key] = null;
        inserted = true;
      } else {
        inserted = insertNode(state.项目节点树, parentKey, node, index);
        if (inserted) {
          state.derived_节点到父节点的映射[node.key] = parentKey;
        }
      }

      if (inserted) {
        state.connected_树节点key到节点数据的映射[node.key] = recordItem;
      }
    },
    更新容器高度: (state, action: PayloadAction<number>) => {
      state.节点树容器的高度 = action.payload;
    },
    更新为了编辑创建的临时节点为: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.为了编辑临时创建的节点的key = action.payload;
    },
    更新当前编辑节点是哪个并更新输入框的值: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.当前正在编辑的项目树节点的key = action.payload;

      if (state.当前正在编辑的项目树节点的key) {
        if (
          state.当前正在编辑的项目树节点的key in
          state.connected_树节点key到节点数据的映射
        ) {
          projectTreeSlice.caseReducers.更新当前输入的标题(state, {
            type: '',
            payload:
              state.connected_树节点key到节点数据的映射[
                state.当前正在编辑的项目树节点的key
              ]!.title,
          });
        } else {
          throw new Error(
            '当前正在编辑的项目树节点的key不在树节点key到节点数据的映射中',
          );
        }
      }
    },
    停止节点编辑状态并清空输入内容: (state) => {
      state.当前正在编辑的项目树节点的key = null;
      projectTreeSlice.caseReducers.清空当前输入的标题(state);
    },
    退出当前正在编辑的节点: (state) => {
      if (state.当前正在编辑的项目树节点的key) {
        if (
          state.当前正在编辑的项目树节点的key ===
          state.为了编辑临时创建的节点的key
        ) {
          projectTreeSlice.caseReducers.删除项目树节点并同步其他状态(state, {
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
        projectTreeSlice.caseReducers.删除项目树节点并同步其他状态(state, {
          type: '',
          payload: nodeKey,
        });
      });
    },
    删除项目树节点并同步其他状态: (state, action: PayloadAction<string>) => {
      const nodeKey = action.payload;

      const removed = removeNode(state.项目节点树, nodeKey);

      if (removed) {
        const 递归删除所有节点映射及关联状态 = (
          node: TreeNode<ProjectStructureTreeDataNode>,
          keyToNodeDataMap: Record<string, unknown>,
          nodeToParentMap: Record<string, unknown>,
        ) => {
          state.所有已经选中的节点 = state.所有已经选中的节点.filter(
            (key) => key !== node.key,
          );
          if (node.key === state.当前正在编辑的项目树节点的key) {
            projectTreeSlice.caseReducers.更新当前编辑节点是哪个并更新输入框的值(
              state,
              {
                type: '',
                payload: null,
              },
            );
          }
          if (node.key === state.为了编辑临时创建的节点的key) {
            projectTreeSlice.caseReducers.恢复当前选中的节点为编辑临时创建节点之前选中的节点的key(
              state,
            );
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
          removed.removedNode,
          state.connected_树节点key到节点数据的映射,
          state.derived_节点到父节点的映射,
        );
      }
    },
    移动项目树节点并同步其他状态: (
      state,
      action: PayloadAction<{
        nodeKey: string;
        newParentKey: string | null;
        newIndex: number;
      }>,
    ) => {
      const { nodeKey, newParentKey, newIndex } = action.payload;

      const removed = removeNode(state.项目节点树, nodeKey);

      if (removed) {
        let finalNewIndex = newIndex;

        if (newParentKey === null) {
          const 父节点 = state.derived_节点到父节点的映射[nodeKey];
          if (父节点 === null) {
            // 被删除节点和插入节点是同一个父节点，并且插入的位置在删除节点的位置之后
            if (removed.index < newIndex) {
              finalNewIndex -= 1;
            }
          }

          insertNodeAtIndex(
            state.项目节点树,
            finalNewIndex,
            removed.removedNode,
          );
          state.derived_节点到父节点的映射[nodeKey] = null;
        } else {
          const 父节点 = state.derived_节点到父节点的映射[nodeKey];
          if (父节点 === newParentKey) {
            if (removed.index < newIndex) {
              finalNewIndex -= 1;
            }
          }

          insertNode(
            state.项目节点树,
            newParentKey,
            removed.removedNode,
            finalNewIndex,
          );
          state.derived_节点到父节点的映射[nodeKey] = newParentKey;

          // 如果插入的父节点没有展开
          if (!state.所有展开的节点的key.includes(newParentKey)) {
            // 那么自动展开他
            state.所有展开的节点的key.push(newParentKey);
          }
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
      projectTreeSlice.caseReducers.插入节点到指定位置(state, {
        payload: { parentKey, node, index, recordItem },
        type: '',
      });
    },
    恢复当前选中的节点为编辑临时创建节点之前选中的节点的key: (state) => {
      if (state.为了编辑临时创建节点之前选中的节点的key) {
        state.所有已经选中的节点 =
          state.为了编辑临时创建节点之前选中的节点的key;
        state.为了编辑临时创建节点之前选中的节点的key = null;
      }
    },
    更新为了编辑临时创建节点之前选中的节点的key为: (
      state,
      action: PayloadAction<string[] | null>,
    ) => {
      state.为了编辑临时创建节点之前选中的节点的key = action.payload;
    },
    清空为了编辑临时创建节点之前选中的节点的key: (state) => {
      state.为了编辑临时创建节点之前选中的节点的key = null;
    },
  },
});

export const {
  initProjectTreeDataMeta,
  更新激活的节点的key,
  选中项目树容器,
  取消选中项目树容器,
  清空当前输入的标题,
  更新当前输入的标题,
  退出当前正在编辑的节点,
  取消指定的节点的选中状态,
  插入新节点在指定节点下并同步更新其他数据,
  更新为了编辑临时创建节点之前选中的节点的key为,
  恢复当前选中的节点为编辑临时创建节点之前选中的节点的key,
  更新选中节点并将之前的选中节点数据暂存,
  更新项目节点树,
  更新节点数据映射,
  更新节点的数据,
  插入节点到指定位置,
  更新容器高度,
  更新为了编辑创建的临时节点为,
  更新当前编辑节点是哪个并更新输入框的值,
  停止节点编辑状态并清空输入内容,
  删除所有选中的节点,
  删除项目树节点并同步其他状态,
  移动项目树节点并同步其他状态,
  更新选中的节点是哪些,
  更新展开的节点是哪些,
  插入节点并且默认展开父节点,
} = projectTreeSlice.actions;

export const projectTreeReducer = projectTreeSlice.reducer;
