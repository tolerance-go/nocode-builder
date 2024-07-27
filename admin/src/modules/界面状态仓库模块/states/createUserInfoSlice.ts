import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStates = {
  username: string;
};

export const userInfoInitialState: UserInfoStates = {
  username: '',
};

export const createUserInfoSlice = () =>
  createSlice({
    name: 'userInfo',
    initialState: userInfoInitialState,
    reducers: {
      更新用户名: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
    },
  });
