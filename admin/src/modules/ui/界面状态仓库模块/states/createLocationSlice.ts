import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocationStates = {
  pathname: string | null;
};

export const createLocationInitialState = () => {
  const locationInitialState: LocationStates = {
    pathname: null,
  };

  return locationInitialState;
};

export const createLocationSlice = () =>
  createSlice({
    name: 'location',
    initialState: createLocationInitialState(),
    reducers: {
      updatePathname: (state, action: PayloadAction<string>) => {
        state.pathname = action.payload;
      },
    },
  });
