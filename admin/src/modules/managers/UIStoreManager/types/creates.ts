import { StoreController } from '../controllers/StoreController';

export type AppSlices = ReturnType<typeof StoreController.createSlices>;
export type AppStore = ReturnType<typeof StoreController.createStore>;
export type RootState = ReturnType<
  ReturnType<typeof StoreController.createStore>['getState']
>;
export type AppDispatch = ReturnType<
  typeof StoreController.createStore
>['dispatch'];
