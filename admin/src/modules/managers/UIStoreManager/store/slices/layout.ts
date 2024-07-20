import { 鼠标跟随组件id到组件参数 } from '@/modules/managers/跟随鼠标显示内容管理者';
import { Entries } from '@/common/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutStates = {
  subSiderVisible: boolean;
  projectTreeTimeLineVisible: boolean;
  拖拽时鼠标附近的跟随组件是否显示: boolean;
  拖拽时鼠标附近的跟随组件id和参数: Entries<鼠标跟随组件id到组件参数> | null;
};

const initialState: LayoutStates = {
  subSiderVisible: false,
  projectTreeTimeLineVisible: false,
  拖拽时鼠标附近的跟随组件是否显示: false,
  拖拽时鼠标附近的跟随组件id和参数: null,
};

export const createLayoutSlice = () =>
  createSlice({
    name: 'layout',
    initialState,
    reducers: {
      显示拖拽时鼠标跟随组件: (
        state,
        action: PayloadAction<Entries<鼠标跟随组件id到组件参数>>,
      ) => {
        state.拖拽时鼠标附近的跟随组件是否显示 = true;
        state.拖拽时鼠标附近的跟随组件id和参数 = action.payload;
      },
      隐藏并取消拖拽时鼠标跟随组件: (state) => {
        state.拖拽时鼠标附近的跟随组件是否显示 = false;
        state.拖拽时鼠标附近的跟随组件id和参数 = null;
      },
      更新拖拽时鼠标附近的跟随节点是否显示: (
        state,
        action: PayloadAction<boolean>,
      ) => {
        state.拖拽时鼠标附近的跟随组件是否显示 = action.payload;
      },
      更新拖拽时鼠标附近的跟随组件id: (
        state,
        action: PayloadAction<Entries<鼠标跟随组件id到组件参数> | null>,
      ) => {
        state.拖拽时鼠标附近的跟随组件id和参数 = action.payload;
      },
      showSubSiderAction: (state) => {
        state.subSiderVisible = true;
      },
      closeSubSiderAction: (state) => {
        state.subSiderVisible = false;
      },
      showProjectTreeTimeLineAction: (state) => {
        state.projectTreeTimeLineVisible = true;
        state.subSiderVisible = true;
      },
      closeProjectTreeTimeLineAction: (state) => {
        state.projectTreeTimeLineVisible = false;
        state.subSiderVisible = false;
      },
    },
  });
