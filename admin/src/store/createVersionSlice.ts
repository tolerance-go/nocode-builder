import { ImmerStateCreator } from '@/utils';

export type VersionStates = {
  version: number;
};

export type VersionActions = {
  addVersion: () => void;
};

export type VersionSlice = VersionStates & VersionActions;

export const createVersionSlice: ImmerStateCreator<
  VersionSlice,
  VersionSlice
> = (set) => ({
  version: 0,
  addVersion: () =>
    set((state) => {
      state.version++;
    }),
});
