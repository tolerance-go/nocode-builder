import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStates = {
  username: string;
};

export const createUserInfoInitialState = () => {
  const userInfoInitialState: UserInfoStates = {
    username: '',
  };

  return userInfoInitialState;
};

export const createUserInfoSlice = () =>
  createSlice({
    name: 'userInfo',
    initialState: createUserInfoInitialState(),
    reducers: {
      更新用户名: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
    },
  });
