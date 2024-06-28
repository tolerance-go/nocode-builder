import { DataBaseTimelineChunk, DataBaseTimelineItem } from "@/types";
import { ImmerStateCreator } from "@/utils";
import { once } from "lodash-es";

export type ServerStates = {
  dataBaseTimelineChunks: DataBaseTimelineChunk[];
  currentTimelineItems: DataBaseTimelineItem[];
};

export type ServerActions = {
  addTimelineItemToPool: (item: DataBaseTimelineItem) => void;
  createTimelineChunkFromPool: () => void;
  updateSyncedLocal: (chunkIndex: number, syncedLocalAt: string) => void;
  updateSyncedRemote: (chunkIndex: number, syncedRemoteAt: string) => void;
  setTimelinePoolCheckInterval: () => void;
};

export type ServerSlice = ServerStates & ServerActions;

export const createServerSlice: ImmerStateCreator<ServerSlice, ServerSlice> = (
  set,
  get,
) => ({
  dataBaseTimelineChunks: [],
  currentTimelineItems: [],

  addTimelineItemToPool: (item: DataBaseTimelineItem) =>
    set((state) => {
      state.currentTimelineItems.push(item);
    }),

  createTimelineChunkFromPool: () => {
    set(
      (state) => {
        if (state.currentTimelineItems.length > 0) {
          const newChunk: DataBaseTimelineChunk = {
            hasSyncedLocal: false,
            hasSyncedRemote: false,
            items: state.currentTimelineItems,
            createdAt: new Date().toISOString(),
          };
          state.dataBaseTimelineChunks.push(newChunk);
          state.currentTimelineItems = [];
        }
      },
      false,
      "createTimelineChunkFromPool",
    );
  },

  updateSyncedLocal: (chunkIndex: number, syncedLocalAt: string) =>
    set((state) => {
      if (state.dataBaseTimelineChunks[chunkIndex]) {
        state.dataBaseTimelineChunks[chunkIndex].hasSyncedLocal = true;
        state.dataBaseTimelineChunks[chunkIndex].syncedLocalAt = syncedLocalAt;
      }
    }),

  updateSyncedRemote: (chunkIndex: number, syncedRemoteAt: string) =>
    set((state) => {
      if (state.dataBaseTimelineChunks[chunkIndex]) {
        state.dataBaseTimelineChunks[chunkIndex].hasSyncedRemote = true;
        state.dataBaseTimelineChunks[chunkIndex].syncedRemoteAt =
          syncedRemoteAt;
      }
    }),

  setTimelinePoolCheckInterval: once(() => {
    setInterval(() => {
      if (get().currentTimelineItems.length > 0) {
        get().createTimelineChunkFromPool();
      }
    }, 1000);
  }),
});
