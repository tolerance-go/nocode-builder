import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createLayoutSlice } from './createLayoutSlice';
import { createLocationSlice } from './createLocationSlice';
import { createNetworkSlice } from './createNetworkSlice';

import { createProjectTreeSlice } from './createProjectTreeSlice';
import { createServerSlice } from './createServerSlice';
import { Store } from '@/types/store';
import { createVersionSlice } from './createVersionSlice';

export const useAppStoreBase = create<Store>()(
  devtools(
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
);

export const useAppStore = createSelectors(useAppStoreBase);
