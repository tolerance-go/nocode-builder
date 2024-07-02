import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  createLayoutSlice,
  createLocationSlice,
  createNetworkSlice,
  createProjectTreeSlice,
} from './createStoreSlice';
import { Store } from '@/types';

export const useAppStoreBase = create<Store>()(
  devtools(
    immer((...a) => {
      return {
        ...createLayoutSlice(...a),
        ...createLocationSlice(...a),
        ...createNetworkSlice(...a),
        ...createProjectTreeSlice(...a),
      };
    }),
  ),
);

export const useAppStore = createSelectors(useAppStoreBase);
