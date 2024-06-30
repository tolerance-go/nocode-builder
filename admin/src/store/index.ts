import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { LayoutSlice, createLayoutSlice } from './createLayoutSlice';
import { LocationSlice, createLocationSlice } from './createLocationSlice';
import { NetworkSlice, createNetworkSlice } from './createNetworkSlice';

import {
  ProjectTreeSlice,
  createProjectTreeSlice,
} from './createProjectTreeSlice';
import { ServerSlice, createServerSlice } from './createServerSlice';

export const useAppStoreBase = create<
  ProjectTreeSlice & NetworkSlice & LocationSlice & LayoutSlice & ServerSlice
>()(
  devtools(
    immer((...a) => {
      return {
        ...createServerSlice(...a),
        ...createLayoutSlice(...a),
        ...createLocationSlice(...a),
        ...createNetworkSlice(...a),
        ...createProjectTreeSlice(...a),
      };
    }),
  ),
);

export const useAppStore = createSelectors(useAppStoreBase);
