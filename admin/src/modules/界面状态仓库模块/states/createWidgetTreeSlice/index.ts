import { ViewKey } from '@/common/types';
import { createSlice } from '@reduxjs/toolkit';
import { WidgetTreeDataNode, WidgetTreeNodeDataRecord } from '../../types';

export type WidgetTreeStates = {
  // 派生数据
  derived_节点到父节点的映射: Record<ViewKey, ViewKey | null>;
  // 关联数据
  项目树节点数据: WidgetTreeNodeDataRecord;
  项目结构树: WidgetTreeDataNode[];
};

export const createWidgetTreeInitialState = () => {
  const initialState: WidgetTreeStates = {
    derived_节点到父节点的映射: {},
    项目结构树: [],
    项目树节点数据: {},
  };
  return initialState;
};

const initialState: WidgetTreeStates = createWidgetTreeInitialState();

export const createWidgetTreeSlice = () => {
  const WidgetTreeSlice = createSlice({
    name: 'widgetTree',
    initialState,
    reducers: {},
  });
  return WidgetTreeSlice;
};
