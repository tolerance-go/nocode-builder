import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStates = {
  username: string;
  token: null | string;
};

export const userInfoInitialState: UserInfoStates = {
  username: '',
  token: null,
};

export const createUserInfoSlice = () =>
  createSlice({
    name: 'userInfo',
    initialState: userInfoInitialState,
    reducers: {
      更新用户名: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
      更新token: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
    },
  });
