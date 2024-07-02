import {
  ProjectTreeSlice,
  NetworkSlice,
  LocationSlice,
  LayoutSlice,
  ProjectTreeStates,
  NetworkStates,
  LocationStates,
  LayoutStates,
} from '@/core/managers/UIStoreManager/store/createStoreSlice';

export type Store = ProjectTreeSlice &
  NetworkSlice &
  LocationSlice &
  LayoutSlice;

export type StoreStates = ProjectTreeStates &
  NetworkStates &
  LocationStates &
  LayoutStates;

export type StoreStatesSlice = {
  id: number;
  version: number;
  data: StoreStates;
};
