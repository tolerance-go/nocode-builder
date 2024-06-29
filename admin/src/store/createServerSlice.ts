import { DataBaseTimelineChunk, DataBaseTimelineItem } from "@/types";
import { ImmerStateCreator } from "@/utils";

export type ServerStates = {
  dataBaseTimelineChunks: DataBaseTimelineChunk[];
  currentTimelineItems: DataBaseTimelineItem[];
  hasSetTimelinePoolCheckInterval: boolean;
  currentChunksIndex: number;
};

export type ServerActions = {
  addTimelineItemToPool: (item: DataBaseTimelineItem) => void;
  createTimelineChunkFromPool: () => void;
  updateSyncedLocal: (chunkIndex: number) => void;
  updateSyncedRemote: (chunkIndex: number) => void;
  setTimelinePoolCheckInterval: () => void;
  consumeChunks: () => void;
  syncChunkToLocal: (chunk: DataBaseTimelineChunk) => void;
};

export type ServerSlice = ServerStates & ServerActions;

const syncChunkToRemote = async (chunk: DataBaseTimelineChunk) => {};

export const createServerSlice: ImmerStateCreator<ServerSlice, ServerSlice> = (
  set,
  get,
) => ({
  dataBaseTimelineChunks: [],
  currentTimelineItems: [],
  hasSetTimelinePoolCheckInterval: false,
  currentChunksIndex: -1,

  syncChunkToLocal: (chunk) => {
    console.log(chunk);
  },

  consumeChunks: async () => {
    const state = get();

    for (
      let i = state.currentChunksIndex + 1;
      i < state.dataBaseTimelineChunks.length;
      i++
    ) {
      const chunk = state.dataBaseTimelineChunks[i];

      if (!chunk.hasSyncedLocal) {
        try {
          // 同步本地
          state.syncChunkToLocal(chunk); // 假设someLocalSyncMethod是同步本地的其他slice的方法

          state.updateSyncedLocal(i);
        } catch {
          break;
        }
      }

      if (!chunk.hasSyncedRemote) {
        try {
          // 调用接口同步远程
          await syncChunkToRemote(chunk); // 假设syncRemote是一个返回同步结果的接口

          state.updateSyncedRemote(i);
        } catch {
          // 如果远程同步失败，则跳出循环，稍后重试
          break;
        }
      }

      set((state) => {
        state.currentChunksIndex = i;
      });
    }
  },

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

  updateSyncedLocal: (chunkIndex: number) =>
    set((state) => {
      if (state.dataBaseTimelineChunks[chunkIndex]) {
        state.dataBaseTimelineChunks[chunkIndex].hasSyncedLocal = true;
        state.dataBaseTimelineChunks[chunkIndex].syncedLocalAt =
          new Date().toISOString();
      }
    }),

  updateSyncedRemote: (chunkIndex: number) =>
    set((state) => {
      if (state.dataBaseTimelineChunks[chunkIndex]) {
        state.dataBaseTimelineChunks[chunkIndex].hasSyncedRemote = true;
        state.dataBaseTimelineChunks[chunkIndex].syncedRemoteAt =
          new Date().toISOString();
      }
    }),

  setTimelinePoolCheckInterval: () => {
    setInterval(() => {
      const state = get();
      if (state.currentTimelineItems.length > 0) {
        state.createTimelineChunkFromPool();
      }
      if (state.dataBaseTimelineChunks.length > 0) {
        state.consumeChunks();
      }
    }, 1000);
    set((state) => {
      state.hasSetTimelinePoolCheckInterval = true;
    });
  },
});
