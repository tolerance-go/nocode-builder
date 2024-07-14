import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 插入节点, removeNode, 批量插入节点 } from '../../utils/tree/effects';
import { TreeNode } from '../../utils/tree/types';
import { compareTrees, insertNodeAtIndex } from '../../utils/tree';
import { 批量删除节点 } from '../../utils/tree/effects/批量删除节点';
import {
  ProjectTreeNodeDataRecord,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '../../../types';

export type ProjectTreeStates = {
  // 派生数据
  derived_节点到父节点的映射: Record<string, string | null>;
  // 关联数据
  项目树节点数据: ProjectTreeNodeDataRecord;
  项目结构树: ProjectStructureTreeDataNode[];
  所有已经选中的节点: string[];
  所有展开的节点的key: string[];
  当前正在编辑的项目树节点的key: string | null;
  临时创建的节点的key: string | null;
  节点树容器的高度: number;
  编辑节点标题之前暂存的选中的节点keys: string[] | null;
  编辑节点标题之前暂存的聚焦的节点key: string | null;
  当前输入的标题: string;
  是否选中了项目树容器: boolean;
  激活的节点的key: string | null;
  当前正在拖拽的节点key: string | null;
  是否正在聚焦项目树区域: boolean;
  当前聚焦的节点key: string | null;
};

const initialState: ProjectTreeStates = {
  derived_节点到父节点的映射: {},
  编辑节点标题之前暂存的聚焦的节点key: null,
  当前聚焦的节点key: null,
  是否正在聚焦项目树区域: false,
  当前正在拖拽的节点key: null,
  激活的节点的key: null,
  当前输入的标题: '',
  项目结构树: [],
  项目树节点数据: {},
  所有已经选中的节点: [],
  所有展开的节点的key: [],
  当前正在编辑的项目树节点的key: null,
  临时创建的节点的key: null,
  节点树容器的高度: 0,
  编辑节点标题之前暂存的选中的节点keys: null,
  是否选中了项目树容器: false,
};

export const createProjectTreeSlice = () => {
  const projectTreeSlice = createSlice({
    name: 'projectTree',
    initialState,
    reducers: {
      修改节点: (
        state,
        action: PayloadAction<{
          nodeKey: string;
          title: string;
        }>,
      ) => {
        projectTreeSlice.caseReducers.更新节点的数据(state, {
          type: '',
          payload: {
            key: action.payload.nodeKey,
            data: {
              title: action.payload.title,
            },
          },
        });
        projectTreeSlice.caseReducers.停止节点编辑状态并清空输入内容(state);
      },

      更新当前聚焦的节点key: (state, action: PayloadAction<string | null>) => {
        state.当前聚焦的节点key = action.payload;
      },
      更新是否正在聚焦项目树区域: (state, action: PayloadAction<boolean>) => {
        state.是否正在聚焦项目树区域 = action.payload;
      },
      更新当前正在拖拽的节点: (state, action: PayloadAction<string | null>) => {
        state.当前正在拖拽的节点key = action.payload;
      },
      更新激活的节点的key: (state, action: PayloadAction<string | null>) => {
        state.激活的节点的key = action.payload;
      },
      更新项目节点树: (
        state,
        action: PayloadAction<{
          结构树: ProjectStructureTreeDataNode[];
          节点数据: ProjectTreeNodeDataRecord;
        }>,
      ) => {
        const { 结构树, 节点数据 } = action.payload;
        const results = compareTrees(state.项目结构树, 结构树);

        state.项目结构树 = 结构树;
        state.项目树节点数据 = 节点数据;

        results.删除.节点keys.forEach((_删除的key, index) => {
          projectTreeSlice.caseReducers.同步删除的节点的关联状态(state, {
            type: '',
            payload: {
              node: results.删除.recordItems[index],
            },
          });
        });

        // 修改不需要同步关联状态

        // 移动需要修改父节点关联状态
        results.移动.forEach((detail) => {
          detail.节点keys.forEach((nodeKey) => {
            state.derived_节点到父节点的映射[nodeKey] = detail.目标父节点key;
          });
        });

        // 新增需要修改关联状态
        results.新增.forEach((detail) => {
          detail.节点keys.forEach((addKey) => {
            state.derived_节点到父节点的映射[addKey] = detail.父节点key;
          });
        });
      },
      更新节点数据映射: (
        state,
        action: PayloadAction<ProjectTreeNodeDataRecord>,
      ) => {
        state.项目树节点数据 = action.payload;
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
          const item = state.项目树节点数据[key];
          if (item) {
            item.title = data.title;
          }
        }
      },
      更新当前输入的标题: (state, action: PayloadAction<string>) => {
        state.当前输入的标题 = action.payload;
      },
      更新容器高度: (state, action: PayloadAction<number>) => {
        state.节点树容器的高度 = action.payload;
      },
      更新为了编辑创建的临时节点为: (
        state,
        action: PayloadAction<string | null>,
      ) => {
        state.临时创建的节点的key = action.payload;
      },
      更新当前编辑节点是哪个并更新输入框的值: (
        state,
        action: PayloadAction<string | null>,
      ) => {
        state.当前正在编辑的项目树节点的key = action.payload;

        if (state.当前正在编辑的项目树节点的key) {
          if (state.当前正在编辑的项目树节点的key in state.项目树节点数据) {
            projectTreeSlice.caseReducers.更新当前输入的标题(state, {
              type: '',
              payload:
                state.项目树节点数据[state.当前正在编辑的项目树节点的key]!
                  .title,
            });
          } else {
            throw new Error(
              '当前正在编辑的项目树节点的key不在树节点key到节点数据的映射中',
            );
          }
        }
      },
      更新选中的节点是哪些: (state, action: PayloadAction<string[]>) => {
        state.所有已经选中的节点 = action.payload;
      },
      更新展开的节点是哪些: (state, action: PayloadAction<string[]>) => {
        state.所有展开的节点的key = action.payload;
      },
      更新为了编辑临时创建节点之前选中的节点的key为: (
        state,
        action: PayloadAction<string[] | null>,
      ) => {
        state.编辑节点标题之前暂存的选中的节点keys = action.payload;
      },
      删除节点: (state, action: PayloadAction<string[]>) => {
        projectTreeSlice.caseReducers.批量删除项目树节点(state, {
          type: '',
          payload: action.payload,
        });
      },
      删除所有选中的节点: (state) => {
        state.所有已经选中的节点.forEach((nodeKey) => {
          projectTreeSlice.caseReducers.删除单个节点(state, {
            type: '',
            payload: nodeKey,
          });
        });
      },
      删除单个节点: (state, action: PayloadAction<string>) => {
        const nodeKey = action.payload;

        const removed = removeNode(state.项目结构树, nodeKey);

        if (removed) {
          projectTreeSlice.caseReducers.同步删除的节点的关联状态(state, {
            type: '',
            payload: {
              node: removed.removedNode,
            },
          });
        }
      },
      批量删除项目树节点: (state, action: PayloadAction<string[]>) => {
        const nodeKeys = action.payload;

        const results = 批量删除节点(state.项目结构树, nodeKeys);

        if (results.removedNodes.length) {
          results.removedNodes.forEach((removedNode) => {
            projectTreeSlice.caseReducers.同步删除的节点的关联状态(state, {
              type: '',
              payload: {
                node: removedNode,
              },
            });
          });
        }
      },
      同步删除的节点的关联状态: (
        state,
        action: PayloadAction<{
          node: TreeNode<ProjectStructureTreeDataNode>;
        }>,
      ) => {
        const { node } = action.payload;
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

        if (node.key === state.临时创建的节点的key) {
          projectTreeSlice.caseReducers.恢复当前选中的节点为编辑临时创建节点之前选中的节点的key(
            state,
          );
          projectTreeSlice.caseReducers.恢复当前聚焦的节点为编辑临时创建节点之前聚焦的节点的key(
            state,
          );
        }

        if (node.key === state.激活的节点的key) {
          state.激活的节点的key = null;
        }

        if (node.key === state.当前聚焦的节点key) {
          state.当前聚焦的节点key = null;
        }

        if (node.key in state.项目树节点数据) {
          delete state.项目树节点数据[node.key];
        }

        delete state.derived_节点到父节点的映射[node.key];

        if (node.children) {
          node.children.forEach((child) => {
            projectTreeSlice.caseReducers.同步删除的节点的关联状态(state, {
              type: '',
              payload: {
                node: child,
              },
            });
          });
        }
      },
      删除选中的节点: (state, action: PayloadAction<string>) => {
        state.所有已经选中的节点 = state.所有已经选中的节点.filter(
          (key) => key !== action.payload,
        );
      },
      新增节点: (
        state,
        action: PayloadAction<{
          nodeKey: string;
          title: string;
        }>,
      ) => {
        if (state.临时创建的节点的key !== action.payload.nodeKey) {
          throw new Error('当前操作节点不是新建节点。');
        }

        projectTreeSlice.caseReducers.更新为了编辑创建的临时节点为(state, {
          type: '',
          payload: null,
        });
        projectTreeSlice.caseReducers.更新为了编辑临时创建节点之前选中的节点的key为(
          state,
          {
            type: '',
            payload: null,
          },
        );
        projectTreeSlice.caseReducers.更新节点的数据(state, {
          type: '',
          payload: {
            key: action.payload.nodeKey,
            data: {
              title: action.payload.title,
            },
          },
        });
        projectTreeSlice.caseReducers.停止节点编辑状态并清空输入内容(state);

        projectTreeSlice.caseReducers.更新激活的节点的key(state, {
          type: '',
          payload: action.payload.nodeKey,
        });
      },
      插入节点: (
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
        projectTreeSlice.caseReducers.清空选中节点并将之前的选中节点数据暂存(
          state,
        );
        projectTreeSlice.caseReducers.清除聚焦的节点并将之前的聚焦节点数据暂存(
          state,
        );
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
          insertNodeAtIndex(state.项目结构树, index, node);
          state.derived_节点到父节点的映射[node.key] = null;
          inserted = true;
        } else {
          inserted = 插入节点(state.项目结构树, parentKey, node, index);
          if (inserted) {
            state.derived_节点到父节点的映射[node.key] = parentKey;
          }
        }

        if (inserted) {
          state.项目树节点数据[node.key] = recordItem;
        }
      },
      移动节点: (
        state,
        action: PayloadAction<{
          nodeKeys: string[];
          newParentKey: string | null;
          newIndex: number;
        }>,
      ) => {
        if (action.payload.nodeKeys.length > 1) {
          projectTreeSlice.caseReducers.批量移动项目树节点(state, {
            type: '',
            payload: {
              nodeKeys: state.所有已经选中的节点,
              newParentKey: action.payload.newParentKey,
              newIndex: action.payload.newIndex,
            },
          });
          return;
        }

        projectTreeSlice.caseReducers.单个移动项目树节点(state, {
          type: '',
          payload: {
            nodeKey: action.payload.nodeKeys[0],
            newParentKey: action.payload.newParentKey,
            newIndex: action.payload.newIndex,
          },
        });
      },
      批量移动项目树节点: (
        state,
        action: PayloadAction<{
          nodeKeys: string[];
          newParentKey: string | null;
          newIndex: number;
        }>,
      ) => {
        const { nodeKeys, newParentKey, newIndex } = action.payload;

        const removed = 批量删除节点(state.项目结构树, nodeKeys);

        if (removed.removedNodes.length) {
          let finalNewIndex = newIndex;

          // 计算删除节点的数量
          const 同一父节点在插入位置之前的删除节点数量 =
            removed.removedNodes.filter(
              (node, index) =>
                state.derived_节点到父节点的映射[node.key] === newParentKey &&
                removed.indices[index] < newIndex,
            ).length;

          // 如果插入节点的父节点和删除节点的父节点是同一个，并且插入的位置在删除的节点之后
          if (同一父节点在插入位置之前的删除节点数量) {
            finalNewIndex -= 同一父节点在插入位置之前的删除节点数量;
          }

          批量插入节点(
            state.项目结构树,
            newParentKey,
            removed.removedNodes,
            finalNewIndex,
          );

          // 如果插入的父节点没有展开
          if (
            newParentKey &&
            !state.所有展开的节点的key.includes(newParentKey)
          ) {
            // 那么自动展开他
            state.所有展开的节点的key.push(newParentKey);
          }

          // 更新移动的节点的父节点
          removed.removedNodes.forEach((removeNode) => {
            state.derived_节点到父节点的映射[removeNode.key] = newParentKey;
          });
        }
      },
      单个移动项目树节点: (
        state,
        action: PayloadAction<{
          nodeKey: string;
          newParentKey: string | null;
          newIndex: number;
        }>,
      ) => {
        const { nodeKey, newParentKey, newIndex } = action.payload;

        const removed = removeNode(state.项目结构树, nodeKey);

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
              state.项目结构树,
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

            插入节点(
              state.项目结构树,
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
      选中项目树容器并清空选中和激活还有聚焦节点: (state) => {
        state.是否选中了项目树容器 = true;
        state.所有已经选中的节点 = [];
        state.激活的节点的key = null;
        state.当前聚焦的节点key = null;
      },
      取消选中项目树容器: (state) => {
        state.是否选中了项目树容器 = false;
      },
      清空当前输入的标题: (state) => {
        state.当前输入的标题 = '';
      },

      清空选中节点并将之前的选中节点数据暂存: (state) => {
        state.编辑节点标题之前暂存的选中的节点keys = [
          ...state.所有已经选中的节点,
        ];
        state.所有已经选中的节点 = [];
      },
      清除聚焦的节点并将之前的聚焦节点数据暂存: (state) => {
        state.编辑节点标题之前暂存的聚焦的节点key = state.当前聚焦的节点key;
        state.当前聚焦的节点key = null;
      },
      取消指定的节点的选中状态: (state, action: PayloadAction<string>) => {
        state.所有已经选中的节点 = state.所有已经选中的节点.filter(
          (key) => key !== action.payload,
        );
      },

      停止节点编辑状态并清空输入内容: (state) => {
        state.当前正在编辑的项目树节点的key = null;
        projectTreeSlice.caseReducers.清空当前输入的标题(state);
      },
      退出当前正在编辑的节点: (state) => {
        if (state.当前正在编辑的项目树节点的key) {
          if (
            state.当前正在编辑的项目树节点的key === state.临时创建的节点的key
          ) {
            projectTreeSlice.caseReducers.删除单个节点(state, {
              type: '',
              payload: state.当前正在编辑的项目树节点的key,
            });
          } else {
            state.当前正在编辑的项目树节点的key = null;
          }
        }
      },
      清空为了编辑临时创建节点之前选中的节点的key: (state) => {
        state.编辑节点标题之前暂存的选中的节点keys = null;
      },
      恢复当前选中的节点为编辑临时创建节点之前选中的节点的key: (state) => {
        if (state.编辑节点标题之前暂存的选中的节点keys) {
          state.所有已经选中的节点 = state.编辑节点标题之前暂存的选中的节点keys;
          state.编辑节点标题之前暂存的选中的节点keys = null;
        }
      },
      恢复当前聚焦的节点为编辑临时创建节点之前聚焦的节点的key: (state) => {
        if (state.编辑节点标题之前暂存的聚焦的节点key) {
          state.当前聚焦的节点key = state.编辑节点标题之前暂存的聚焦的节点key;
          state.编辑节点标题之前暂存的聚焦的节点key = null;
        }
      },
    },
  });
  return projectTreeSlice;
};
