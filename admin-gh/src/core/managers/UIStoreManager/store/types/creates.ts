import { createSlices, createStore } from '../creates';

export type AppSlices = ReturnType<typeof createSlices>;
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
