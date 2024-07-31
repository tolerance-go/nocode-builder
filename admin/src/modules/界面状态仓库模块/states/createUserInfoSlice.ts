import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfoStates = {
  username: string;
  isAdmin: boolean | undefined;
};

export const createUserInfoInitialState = () => {
  const userInfoInitialState: UserInfoStates = {
    username: '',
    isAdmin: undefined,
  };

  return userInfoInitialState;
};

export const createUserInfoSlice = () =>
  createSlice({
    name: 'userInfo',
    initialState: createUserInfoInitialState(),
    reducers: {
      更新用户信息: (
        state,
        action: PayloadAction<{
          username: string;
          isAdmin: boolean;
        }>,
      ) => {
        state.username = action.payload.username;
        state.isAdmin = action.payload.isAdmin;
      },
    },
  });
