import { delay } from '@/utils';
import {
  setup,
  assign,
  fromPromise,
  PromiseActorLogic,
  createActor,
} from 'xstate';

export type HistoryRecord = {
  state: string;
};

/**
 * 模拟加载历史记录的服务函数
 * @returns {Promise<unknown[]>} 模拟的历史记录数据
 */
const fetchUserLogic: PromiseActorLogic<HistoryRecord[]> = fromPromise(
  async ({ input }) => {
    // console.log(input);
    // await delay(1000);
    // return [
    //   { state: 'state1' },
    //   { state: 'state2' },
    //   { state: 'state3' },
    // ] as HistoryRecord[];
    return [];
  },
);

/**
 * 定义上下文类型
 * - historyStack: 用于存储所有历史记录的堆栈，最新记录位于栈顶。
 * - historyPointer: 指向当前激活的历史记录索引，初始值为-1（表示未选择任何历史记录）。
 */
export interface HistoryContext {
  historyStack: HistoryRecord[];
  historyPointer: number;
}

/**
 * 定义事件类型
 * - UNDO_REQUESTED: 用户触发撤销操作的事件。
 * - REDO_REQUESTED: 用户触发重做操作的事件。
 * - START_BROWSING_HISTORY: 开始浏览历史记录。
 * - STOP_BROWSING_HISTORY: 结束浏览历史记录并回到之前状态。
 * - SELECT_HISTORY_ITEM: 从浏览模式中选择一个历史记录项。
 * - UPDATE_HISTORY: 应用新状态到历史记录栈，通常由外部操作触发。
 */
export type HistoryEvent =
  | { type: 'UNDO_REQUESTED' }
  | { type: 'REDO_REQUESTED' }
  | { type: 'START_BROWSING_HISTORY' }
  | { type: 'STOP_BROWSING_HISTORY' }
  | { type: 'FETCH_HISTORY' }
  | { type: 'SELECT_HISTORY_ITEM'; index: number }
  | { type: 'UPDATE_HISTORY'; state: HistoryRecord }
  | { type: 'RETRY_LOADING_HISTORY' };

// 创建状态机
const historyMachine = setup({
  types: {
    context: {} as HistoryContext,
    events: {} as HistoryEvent,
  },
  actions: {
    // 执行撤销操作: 执行撤销逻辑，弹出最近的历史记录并应用到当前状态。
    performUndo: assign({
      historyPointer: ({ context }) => context.historyPointer - 1,
    }),
    // 执行重做操作: 执行重做逻辑，从历史记录栈中获取上一个记录并应用。
    performRedo: assign({
      historyPointer: ({ context }) => context.historyPointer + 1,
    }),
    // 添加历史记录: 动作用于向历史记录堆栈中添加一条新记录。
    addHistory: assign({
      historyStack: ({ context, event }) => {
        if (event.type === 'UPDATE_HISTORY') {
          return [...context.historyStack, event.state];
        }
        return context.historyStack;
      },
    }),
    // 更新历史记录指针: 动作用于更新当前的历史记录指针。
    updatePointer: assign({
      historyPointer: ({ event }) =>
        event.type === 'SELECT_HISTORY_ITEM' ? event.index : -1,
    }),
    // 切换撤销/重做状态: 根据 `historyStack` 的状态更新 `canUndo` 和 `canRedo`。
    toggleCanUndoRedoStatus: assign({
      historyPointer: ({ context }) =>
        context.historyStack.length > 0 ? context.historyPointer : -1,
    }),
  },
  guards: {
    // 检查是否可以撤销: 判断是否可以执行撤销操作。
    canPerformUndo: ({ context }) => context.historyPointer > 0,
    // 检查是否可以重做: 判断是否可以执行重做操作。
    canPerformRedo: ({ context }) =>
      context.historyPointer < context.historyStack.length - 1,
  },
  actors: {
    fetchUser: fetchUserLogic,
  },
}).createMachine({
  id: 'history',
  initial: 'idle',
  context: {
    historyStack: [],
    historyPointer: -1,
  },
  states: {
    // 待机状态: 初始或待机状态，无操作进行。
    idle: {
      on: {
        // 接收 UNDO_REQUESTED 事件，转换到 undoing 状态，并执行撤销动作。
        UNDO_REQUESTED: {
          target: 'undoing',
          guard: 'canPerformUndo',
        },
        // 接收 REDO_REQUESTED 事件，转换到 redoing 状态，并执行重做动作。
        REDO_REQUESTED: {
          target: 'redoing',
          guard: 'canPerformRedo',
        },
        // 接收 START_BROWSING_HISTORY 事件，转换到 browsingHistory 状态。
        START_BROWSING_HISTORY: 'browsingHistory',
        // 开始加载历史记录
        FETCH_HISTORY: 'loadingHistory',
      },
    },
    // 撤销操作中: 当前正在执行撤销操作。
    undoing: {
      entry: 'performUndo',
      always: {
        target: 'idle',
        actions: 'toggleCanUndoRedoStatus',
      },
    },
    // 重做操作中: 当前正在执行重做操作。
    redoing: {
      entry: 'performRedo',
      always: {
        target: 'idle',
        actions: 'toggleCanUndoRedoStatus',
      },
    },
    // 浏览历史记录中: 当前正在浏览历史记录。
    browsingHistory: {
      on: {
        // 接收 STOP_BROWSING_HISTORY 事件，转换到 idle 状态。
        STOP_BROWSING_HISTORY: 'idle',
        // 接收 SELECT_HISTORY_ITEM 事件，更新历史记录指针。
        SELECT_HISTORY_ITEM: {
          actions: 'updatePointer',
        },
      },
    },
    // 加载历史纪录中
    loadingHistory: {
      invoke: {
        id: 'fetchUser',
        src: 'fetchUser',
        onDone: {
          target: 'idle',
          actions: assign({
            historyStack: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'failure',
        },
      },
    },
    // 加载历史记录失败
    failure: {
      on: {
        RETRY_LOADING_HISTORY: 'loadingHistory', // 重试加载历史记录
      },
    },
  },
});

export const historyMachineActor = createActor(historyMachine);
