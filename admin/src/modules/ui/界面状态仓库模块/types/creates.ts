import { 界面状态仓库模块 } from '@/modules/ui/界面状态仓库模块';

export type AppSlices = ReturnType<typeof 界面状态仓库模块.createSlices>;
export type AppStore = ReturnType<typeof 界面状态仓库模块.createStore>;
export type RootState = ReturnType<
  ReturnType<typeof 界面状态仓库模块.createStore>['getState']
>;
export type AppDispatch = ReturnType<
  typeof 界面状态仓库模块.createStore
>['dispatch'];
