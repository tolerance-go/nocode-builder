import { createSlices, createStore } from './createStore';

export type Slices = ReturnType<typeof createSlices>;
export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
