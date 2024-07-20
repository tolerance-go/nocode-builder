import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocationStates = {
  pathname: string | null;
};

export const locationInitialState: LocationStates = {
  pathname: null,
};

export const createLocationSlice = () =>
  createSlice({
    name: 'location',
    initialState: locationInitialState,
    reducers: {
      updatePathname: (state, action: PayloadAction<string>) => {
        state.pathname = action.payload;
      },
    },
  });
