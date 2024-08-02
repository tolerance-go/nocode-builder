import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../types';

// 使用 withTypes 来指定 RootState 类型
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
}>();
