import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStates = {
  username: string;
  token: null | string;
};

const initialState: UserInfoStates = {
  username: '',
  token: null,
};

export const createUserInfoSlice = () =>
  createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      更新用户名: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
      更新token: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
    },
  });
