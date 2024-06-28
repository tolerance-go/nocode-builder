import { StateCreator } from "zustand";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NetworkStates = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type NetworkActions = {};

export type NetworkSlice = NetworkStates & NetworkActions;

export const createNetworkSlice: StateCreator<
  NetworkSlice,
  [],
  [],
  NetworkSlice
> = () => ({});
