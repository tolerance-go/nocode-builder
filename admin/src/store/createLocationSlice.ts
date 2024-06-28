import { ImmerStateCreator } from "@/utils";

export type LocationStates = {
  pathname: string | null;
};

export type LocationActions = {
  updatePathname: (data: string) => void;
};

export type LocationSlice = LocationStates & LocationActions;

export const createLocationSlice: ImmerStateCreator<
  LocationSlice,
  LocationSlice
> = (set) => ({
  pathname: null,
  updatePathname: (data) =>
    set((state) => {
      state.pathname = data;
    }),
});
