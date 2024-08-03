import { ViewKey } from '@/common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetTreeNodeDataRecord, WidgetTreeDataNode } from '../../types';
import { generateDerivedMapping } from './utils';

export type ProjectContentStates = {
  // 派生数据
  derived_widget节点到父节点的映射: Record<ViewKey, ViewKey | null>;
  // 关联数据
  widgetTreeNodeDatas: WidgetTreeNodeDataRecord;
  widgetTree: WidgetTreeDataNode[];
};

// 定义 reducer 的 payload 类型
interface UpdateWidgetTreePayload {
  widgetTree: WidgetTreeDataNode[];
  widgetTreeNodeDatas: WidgetTreeNodeDataRecord;
}

export const createProjectContentInitialState = () => {
  const initialState: ProjectContentStates = {
    derived_widget节点到父节点的映射: {},
    widgetTree: [],
    widgetTreeNodeDatas: {},
  };
  return initialState;
};

const initialState: ProjectContentStates = createProjectContentInitialState();

export const createProjectContentSlice = () => {
  const projectContentSlice = createSlice({
    name: 'projectContent',
    initialState,
    reducers: {
      updateWidgetTreeData(
        state,
        action: PayloadAction<UpdateWidgetTreePayload>,
      ) {
        state.widgetTree = action.payload.widgetTree;
        state.widgetTreeNodeDatas = action.payload.widgetTreeNodeDatas;
        state.derived_widget节点到父节点的映射 = generateDerivedMapping(
          action.payload.widgetTree,
        );
      },
    },
  });
  return projectContentSlice;
};
