import { DataBaseTimelineChunk, DataBaseTimelineItem } from "@/types";
import { ImmerStateCreator } from "@/utils";
import { ProjectTableDataActions } from "./createProjectTableSlice";

export type ServerStates = {
  dataBaseTimelineChunks: DataBaseTimelineChunk[];
  currentTimelineItems: DataBaseTimelineItem[];
  hasSetTimelinePoolCheckInterval: boolean;
  currentChunksIndex: number;
  currentChunkItemsIndex: number;
  isConsumingChunks: boolean;
  intervalId: NodeJS.Timeout | null;
};

export type ServerActions = {
  addTimelineItemToPool: (item: DataBaseTimelineItem) => void;
  createTimelineChunkFromPool: () => void;
  updateSyncedLocal: (chunkIndex: number) => void;
  updateSyncedRemote: (chunkIndex: number) => void;
  setTimelinePoolCheckInterval: () => void;
  consumeChunks: () => void;
  syncChunkToLocal: (chunk: DataBaseTimelineChunk) => void;
  syncChunkToRemote: (chunk: DataBaseTimelineChunk) => void;
};

export type ServerSlice = ServerStates & ServerActions;

export const createServerSlice: ImmerStateCreator<
  ServerSlice & ProjectTableDataActions,
  ServerSlice
> = (set, get) => ({
  dataBaseTimelineChunks: [],
  currentTimelineItems: [],
  hasSetTimelinePoolCheckInterval: false,
  currentChunksIndex: -1,
  currentChunkItemsIndex: -1,
  isConsumingChunks: false,
  intervalId: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  syncChunkToRemote: async (_chunk: DataBaseTimelineChunk) => {},

  syncChunkToLocal: (chunk) => {
    const snapshot = get();

    let hasError = false;
    let catchesError: unknown;

    for (
      let i = snapshot.currentChunkItemsIndex + 1;
      i < chunk.items.length;
      i++
    ) {
      const item = chunk.items[i];

      try {
        if (item.tableName === "project") {
          if (item.actionName === "delete") {
            snapshot.deleteProject(item.recordId);
          }
        }
      } catch (error) {
        hasError = true;
        catchesError = error;
        // 结束循环
        break;
      }

      set({
        currentChunkItemsIndex: i,
      });
    }

    // 失败了抛出去，让 consumeChunks 知道失败了
    if (hasError) {
      throw catchesError;
    }

    // 如果都成功了，表示一个 chunk 处理完了，就重置下标
    set({
      currentChunkItemsIndex: -1,
    });
  },

  consumeChunks: async () => {
    set({
      isConsumingChunks: true,
    });

    const snapshot = get();

    for (
      let i = snapshot.currentChunksIndex + 1;
      i < snapshot.dataBaseTimelineChunks.length;
      i++
    ) {
      const chunk = snapshot.dataBaseTimelineChunks[i];

      if (!chunk.hasSyncedLocal) {
        try {
          // 同步本地
          snapshot.syncChunkToLocal(chunk); // 假设someLocalSyncMethod是同步本地的其他slice的方法
        } catch (error) {
          console.error("Local sync failed:", error);
          break;
        }

        snapshot.updateSyncedLocal(i);
      }

      if (!chunk.hasSyncedRemote) {
        try {
          // 调用接口同步远程
          await snapshot.syncChunkToRemote(chunk); // 假设syncRemote是一个返回同步结果的接口
        } catch (error) {
          console.error("Remote sync failed:", error);
          // 如果远程同步失败，则跳出循环，稍后重试
          break;
        }

        snapshot.updateSyncedRemote(i);
      }

      set((state) => {
        state.currentChunksIndex = i;
      });
    }

    set({
      isConsumingChunks: false,
    });
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
    const snapshot = get();

    if (snapshot.intervalId) {
      clearInterval(snapshot.intervalId);
    }

    const intervalId = setInterval(() => {
      const snapshot = get();

      if (snapshot.currentTimelineItems.length > 0) {
        snapshot.createTimelineChunkFromPool();
      }

      if (
        snapshot.dataBaseTimelineChunks.length > 0 &&
        // 下标小于最后一个
        snapshot.currentChunksIndex < snapshot.dataBaseTimelineChunks.length - 1
      ) {
        if (!snapshot.isConsumingChunks) {
          snapshot.consumeChunks();
        }
      }
    }, 1000);

    set((state) => {
      state.intervalId = intervalId;
      state.hasSetTimelinePoolCheckInterval = true;
    });
  },
});
