import { LayoutSlice, LayoutStates } from '@/store/createLayoutSlice';
import { LocationSlice, LocationStates } from '@/store/createLocationSlice';
import { NetworkSlice, NetworkStates } from '@/store/createNetworkSlice';
import {
  ProjectTreeSlice,
  ProjectTreeStates,
} from '@/store/createProjectTreeSlice';

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
