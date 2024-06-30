import { LayoutSlice, LayoutStates } from '@/store/createLayoutSlice';
import { LocationSlice, LocationStates } from '@/store/createLocationSlice';
import { NetworkSlice, NetworkStates } from '@/store/createNetworkSlice';
import {
  ProjectTreeSlice,
  ProjectTreeStates,
} from '@/store/createProjectTreeSlice';
import { ServerSlice, ServerStates } from '@/store/createServerSlice';

export type Store = ProjectTreeSlice &
  NetworkSlice &
  LocationSlice &
  LayoutSlice &
  ServerSlice;

export type StoreStates = ProjectTreeStates &
  NetworkStates &
  LocationStates &
  LayoutStates &
  ServerStates;

export type StoreStatesSlice = {
  id: number;
  version: string;
  data: StoreStates;
};
