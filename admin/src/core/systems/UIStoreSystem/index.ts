import { System } from '@/types';
import { createSelectors } from '@/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Store } from '@/types';
import {
  createLayoutSlice,
  createLocationSlice,
  createNetworkSlice,
  createProjectTreeSlice,
} from '@/core/managers/UIStoreManager/createStoreSlice';

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

export class UIStoreSystem implements System {
  private static instance: UIStoreSystem | undefined;

  public useAppStoreBase = useAppStoreBase;
  public useAppStore = useAppStore;

  private constructor() {}

  public static getInstance(): UIStoreSystem {
    if (!this.instance) {
      this.instance = new UIStoreSystem();
    }
    return this.instance;
  }

  public launch(): void {
    // 启动逻辑
  }
}
