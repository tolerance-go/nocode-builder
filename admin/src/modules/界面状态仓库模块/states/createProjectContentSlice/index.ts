import { ViewKey } from '@/common/types';
import { createSlice } from '@reduxjs/toolkit';
import { WidgetTreeNodeDataRecord, WidgetTreeDataNode } from '../../types';

export type ProjectContentStates = {
  // 派生数据
  derived_widget节点到父节点的映射: Record<ViewKey, ViewKey | null>;
  // 关联数据
  widgetTreeNodeDatas: WidgetTreeNodeDataRecord;
  widgetTree: WidgetTreeDataNode[];
};

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
    reducers: {},
  });
  return projectContentSlice;
};
