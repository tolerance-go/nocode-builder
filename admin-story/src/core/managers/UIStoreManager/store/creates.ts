import { configureStore, Middleware } from '@reduxjs/toolkit';
import {
  createLayoutSlice,
  createLocationSlice,
  createProjectTreeSlice,
  createUserInfoSlice,
} from './slices';
import { AppMiddleware } from './types/AppMiddleware';

export const createSlices = () => {
  const projectSlice = createProjectTreeSlice();
  const layoutSlice = createLayoutSlice();
  const locationSlice = createLocationSlice();
  const userInfoSlice = createUserInfoSlice();
  const slices = {
    [projectSlice.name]: projectSlice,
    [layoutSlice.name]: layoutSlice,
    [locationSlice.name]: locationSlice,
    [userInfoSlice.name]: userInfoSlice,
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
    userInfo: slices.userInfo.reducer,
  };

  return reducers;
};

export const createStore = <T extends ReturnType<typeof createReducers>>(
  reducer: T,
  middlewares: AppMiddleware[] = [],
  preloadedState: object | null = null,
) =>
  configureStore({
    reducer,
    preloadedState: preloadedState ?? undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares as Middleware[]),
  });
