import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './slices';
import { layoutReducer } from './slices/layout';
import { locationReducer } from './slices/location';
import { projectTreeReducer } from './slices/projectTree';

export const reduxStore = configureStore({
  reducer: {
    counter: counterReducer,
    layout: layoutReducer,
    location: locationReducer,
    projectTree: projectTreeReducer,
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof reduxStore.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
