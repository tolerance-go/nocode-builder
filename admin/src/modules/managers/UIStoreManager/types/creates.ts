import { StoreModule } from '../controllers/StoreController';

export type AppSlices = ReturnType<typeof StoreModule.createSlices>;
export type AppStore = ReturnType<typeof StoreModule.createStore>;
export type RootState = ReturnType<
  ReturnType<typeof StoreModule.createStore>['getState']
>;
export type AppDispatch = ReturnType<
  typeof StoreModule.createStore
>['dispatch'];
