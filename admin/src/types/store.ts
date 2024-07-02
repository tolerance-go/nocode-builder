import {
  LayoutSlice,
  LayoutStates,
} from '@/core/managers/UIStoreManager/createLayoutSlice';
import {
  LocationSlice,
  LocationStates,
} from '@/core/managers/UIStoreManager/store/createStoreSlice/createLocationSlice';
import {
  NetworkSlice,
  NetworkStates,
} from '@/core/managers/UIStoreManager/store/createStoreSlice/createNetworkSlice';
import {
  ProjectTreeSlice,
  ProjectTreeStates,
} from '@/core/managers/UIStoreManager/store/createStoreSlice/createProjectTreeSlice';

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
