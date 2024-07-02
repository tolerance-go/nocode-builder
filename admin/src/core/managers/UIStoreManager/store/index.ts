import { configureStore } from '@reduxjs/toolkit';
import { layoutReducer, locationReducer, projectTreeReducer } from './slices';

export const reduxStore = configureStore({
  reducer: {
    layout: layoutReducer,
    location: locationReducer,
    projectTree: projectTreeReducer,
  },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof reduxStore.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;

export * from './slices';
