import { createSlice } from '@reduxjs/toolkit';

export type LayoutStates = {
  subSiderVisible: boolean;
  projectTreeTimeLineVisible: boolean;
};

const initialState: LayoutStates = {
  subSiderVisible: false,
  projectTreeTimeLineVisible: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
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

// Action creators are generated for each case reducer function
export const {
  showSubSiderAction,
  closeSubSiderAction,
  showProjectTreeTimeLineAction,
  closeProjectTreeTimeLineAction,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
