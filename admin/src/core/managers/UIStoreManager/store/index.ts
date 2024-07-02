import { Store } from '@/types';
import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  createLayoutSlice,
  createLocationSlice,
  createNetworkSlice,
  createProjectTreeSlice,
} from './createStoreSlice';

export const useAppStoreBase = create<Store>()(
  immer((...a) => {
    return {
      ...createLayoutSlice(...a),
      ...createLocationSlice(...a),
      ...createNetworkSlice(...a),
      ...createProjectTreeSlice(...a),
    };
  }),
);

export const useAppStore = createSelectors(useAppStoreBase);
