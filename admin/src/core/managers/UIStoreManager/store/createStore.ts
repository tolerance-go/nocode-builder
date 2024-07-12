import { configureStore } from '@reduxjs/toolkit';
import {
  createLayoutSlice,
  createLocationSlice,
  createProjectTreeSlice,
} from './slices';

export const createSlices = () => {
  const projectSlice = createProjectTreeSlice();
  const layoutSlice = createLayoutSlice();
  const locationSlice = createLocationSlice();
  const slices = {
    [projectSlice.name]: projectSlice,
    [layoutSlice.name]: layoutSlice,
    [locationSlice.name]: locationSlice,
  };
  return slices;
};

export const createReducers = <T extends ReturnType<typeof createSlices>>(
  slices: T,
) => {
  const reducers = {
    projectTree: slices.projectTree.reducer,
    layout: slices.layout.reducer,
    location: slices.location.reducer,
  };

  return reducers;
};

export const createStore = <T extends ReturnType<typeof createReducers>>(
  reducer: T,
) =>
  configureStore({
    reducer,
  });
