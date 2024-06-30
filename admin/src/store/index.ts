import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createLayoutSlice } from './createLayoutSlice';
import { createLocationSlice } from './createLocationSlice';
import { createNetworkSlice } from './createNetworkSlice';

import { createProjectTreeSlice } from './createProjectTreeSlice';
import { createServerSlice } from './createServerSlice';
import { Store } from '@/types/store';
import { storeSliceMiddleware } from '@/middlewares';
import { createVersionSlice } from './createVersionSlice';

export const useAppStoreBase = create<Store>()(
  devtools(
    persist(
      storeSliceMiddleware(
        immer((...a) => {
          return {
            ...createServerSlice(...a),
            ...createVersionSlice(...a),
            ...createLayoutSlice(...a),
            ...createLocationSlice(...a),
            ...createNetworkSlice(...a),
            ...createProjectTreeSlice(...a),
          };
        }),
      ),
      {
        name: 'localStore',
      },
    ),
  ),
);

export const useAppStore = createSelectors(useAppStoreBase);
