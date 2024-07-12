import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 插入节点, removeNode, 批量插入节点 } from '../../utils/tree/effects';
import { TreeNode } from '../../utils/tree/types';
import {
  insertNodeAtIndex,
  过滤掉包含父节点在内的节点,
} from '../../utils/tree';
import { 批量删除节点 } from '../../utils/tree/effects/批量删除节点';
import {
  ProjectTreeNodeDataRecord,
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '../../../types';

export type ProjectTreeStates = {
  hasInitProjectTreeDataMeta: boolean;
  // 派生数据
  derived_节点到父节点的映射: Record<string, string | null>;
  // 关联数据
  树节点key到节点数据的映射: ProjectTreeNodeDataRecord;
  项目节点树: ProjectStructureTreeDataNode[];
  所有已经选中的节点: string[];
  所有展开的节点的key: string[];
  当前正在编辑的项目树节点的key: string | null;
  为了编辑临时创建的节点的key: string | null;
  节点树容器的高度: number;
  为了编辑节点标题而暂存的之前选中的节点keys: string[] | null;
  为了编辑节点标题而暂存的之前聚焦的节点key: string | null;
  当前输入的标题: string;
  是否选中了项目树容器: boolean;
  激活的节点的key: string | null;
  当前正在拖拽的节点key: string | null;
  是否正在聚焦项目树区域: boolean;
  当前聚焦的节点key: string | null;
};

const initialState: ProjectTreeStates = {
  为了编辑节点标题而暂存的之前聚焦的节点key: null,
  当前聚焦的节点key: null,
  是否正在聚焦项目树区域: false,
  当前正在拖拽的节点key: null,
  激活的节点的key: null,
  当前输入的标题: '',
  项目节点树: [],
  树节点key到节点数据的映射: {},
  hasInitProjectTreeDataMeta: false,
  所有已经选中的节点: [],
  所有展开的节点的key: [],
  当前正在编辑的项目树节点的key: null,
  derived_节点到父节点的映射: {},
  为了编辑临时创建的节点的key: null,
  节点树容器的高度: 0,
  为了编辑节点标题而暂存的之前选中的节点keys: null,
  是否选中了项目树容器: false,
};

export const createProjectTreeSlice = () => {
  const projectTreeSlice = createSlice({
    name: 'projectTree',
    initialState,
    reducers: {
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
        projectTreeSlice.caseReducers.清空选中节点并将之前的选中节点数据暂存(
          state,
        );
        projectTreeSlice.caseReducers.清除聚焦的节点并将之前的聚焦节点数据暂存(
          state,
        );
        projectTreeSlice.caseReducers.更新激活的节点的key(state, {
          type: '',
          payload: action.payload.node.key,
        });
      },
      清空选中节点并将之前的选中节点数据暂存: (state) => {
        state.为了编辑节点标题而暂存的之前选中的节点keys = [
          ...state.所有已经选中的节点,
        ];
        state.所有已经选中的节点 = [];
      },
      清除聚焦的节点并将之前的聚焦节点数据暂存: (state) => {
        state.为了编辑节点标题而暂存的之前聚焦的节点key =
          state.当前聚焦的节点key;
        state.当前聚焦的节点key = null;
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
          inserted = 插入节点(state.项目节点树, parentKey, node, index);
          if (inserted) {
            state.derived_节点到父节点的映射[node.key] = parentKey;
          }
        }

        if (inserted) {
          state.树节点key到节点数据的映射[node.key] = recordItem;
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
            state.树节点key到节点数据的映射
          ) {
            projectTreeSlice.caseReducers.更新当前输入的标题(state, {
              type: '',
              payload:
                state.树节点key到节点数据的映射[
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
              projectTreeSlice.caseReducers.恢复当前聚焦的节点为编辑临时创建节点之前聚焦的节点的key(
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
            state.树节点key到节点数据的映射,
            state.derived_节点到父节点的映射,
          );
        }
      },
      批量移动项目树节点并同步其他状态: (
        state,
        action: PayloadAction<{
          nodeKeys: string[];
          newParentKey: string | null;
          newIndex: number;
        }>,
      ) => {
        const { nodeKeys, newParentKey, newIndex } = action.payload;

        const 互不包含的等待移动的节点 = 过滤掉包含父节点在内的节点(
          nodeKeys,
          state.derived_节点到父节点的映射,
        );

        const removed = 批量删除节点(
          state.项目节点树,
          互不包含的等待移动的节点,
        );

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
            state.项目节点树,
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
      单个移动项目树节点并同步其他状态: (
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

            插入节点(
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
      移动项目树节点并同步其他状态: (
        state,
        action: PayloadAction<{
          nodeKey: string;
          newParentKey: string | null;
          newIndex: number;
        }>,
      ) => {
        // 如果移动的节点是选中的
        // 并且选中的节点包含多个
        // 那么使用批量移动节点操作
        if (
          state.所有已经选中的节点.includes(action.payload.nodeKey) &&
          state.所有已经选中的节点.length > 1
        ) {
          projectTreeSlice.caseReducers.批量移动项目树节点并同步其他状态(
            state,
            {
              type: '',
              payload: {
                nodeKeys: state.所有已经选中的节点,
                newParentKey: action.payload.newParentKey,
                newIndex: action.payload.newIndex,
              },
            },
          );
          return;
        }

        projectTreeSlice.caseReducers.单个移动项目树节点并同步其他状态(
          state,
          action,
        );
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
        if (state.为了编辑节点标题而暂存的之前选中的节点keys) {
          state.所有已经选中的节点 =
            state.为了编辑节点标题而暂存的之前选中的节点keys;
          state.为了编辑节点标题而暂存的之前选中的节点keys = null;
        }
      },
      恢复当前聚焦的节点为编辑临时创建节点之前聚焦的节点的key: (state) => {
        if (state.为了编辑节点标题而暂存的之前聚焦的节点key) {
          state.当前聚焦的节点key =
            state.为了编辑节点标题而暂存的之前聚焦的节点key;
          state.为了编辑节点标题而暂存的之前聚焦的节点key = null;
        }
      },
      更新为了编辑临时创建节点之前选中的节点的key为: (
        state,
        action: PayloadAction<string[] | null>,
      ) => {
        state.为了编辑节点标题而暂存的之前选中的节点keys = action.payload;
      },
      清空为了编辑临时创建节点之前选中的节点的key: (state) => {
        state.为了编辑节点标题而暂存的之前选中的节点keys = null;
      },
    },
  });
  return projectTreeSlice;
};
