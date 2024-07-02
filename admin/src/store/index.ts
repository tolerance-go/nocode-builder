import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createLayoutSlice } from '../core/managers/UIStoreManager/createStoreSlice/createLayoutSlice';
import { createLocationSlice } from '../core/managers/UIStoreManager/createStoreSlice/createLocationSlice';
import { createNetworkSlice } from '../core/managers/UIStoreManager/createStoreSlice/createNetworkSlice';

import { createProjectTreeSlice } from '../core/managers/UIStoreManager/createStoreSlice/createProjectTreeSlice';
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
