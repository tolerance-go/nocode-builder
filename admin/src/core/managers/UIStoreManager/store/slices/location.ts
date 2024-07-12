import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocationStates = {
  pathname: string | null;
};

const initialState: LocationStates = {
  pathname: null,
};

export const createLocationSlice = () =>
  createSlice({
    name: 'location',
    initialState,
    reducers: {
      updatePathname: (state, action: PayloadAction<string>) => {
        state.pathname = action.payload;
      },
    },
  });
