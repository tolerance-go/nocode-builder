import { storeDb } from '@/db';
import { ImmerStateCreator } from '@/utils';

export type VersionStates = {
  externalLatestVersion: number;
  externalCurrentVersion: number;
  version: number;
  versionCursorPending: boolean;
};

export type VersionActions = {
  addVersion: () => void;
  backVersion: () => void;
  nextVersion: () => void;
};

export type VersionSlice = VersionStates & VersionActions;

export const createVersionSlice: ImmerStateCreator<
  VersionSlice,
  VersionSlice
> = (set, get) => ({
  version: 0,
  externalCurrentVersion: 0,
  externalLatestVersion: 0,
  versionCursorPending: false,
  addVersion: () =>
    set((state) => {
      state.version = state.externalCurrentVersion + 1;
      state.externalCurrentVersion = state.externalLatestVersion;
    }),
  backVersion: async () => {
    const prevVersion = get().externalCurrentVersion - 1;

    if (prevVersion < 0) return;

    set((state) => {
      state.versionCursorPending = true; // 开始加载
    });

    try {
      const prevState = await storeDb.stores
        .where('version')
        .equals(prevVersion)
        .first();

      if (prevState) {
        set((state) => {
          Object.assign(state, prevState.data);
          state.externalCurrentVersion = prevVersion;
        });
      }
    } catch (error) {
      console.error('Failed to load previous version:', error);
    } finally {
      set((state) => {
        state.versionCursorPending = false; // 完成加载
      });
    }
  },
  nextVersion: async () => {
    const nextVersion = get().externalCurrentVersion + 1;

    set((state) => {
      state.versionCursorPending = true; // 开始加载
    });

    try {
      const nextState = await storeDb.stores
        .where('version')
        .equals(nextVersion)
        .first();

      if (nextState) {
        set((state) => {
          Object.assign(state, nextState.data);
          state.externalCurrentVersion = nextVersion;
        });
      }
    } catch (error) {
      console.error('Failed to load next version:', error);
    } finally {
      set((state) => {
        state.versionCursorPending = false; // 完成加载
      });
    }
  },
});
