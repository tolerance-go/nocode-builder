import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocationStates = {
  pathname: string | null;
};

const initialState: LocationStates = {
  pathname: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updatePathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const locationActions = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
