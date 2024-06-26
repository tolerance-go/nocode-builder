/**
 * # 历史记录状态机
 *
 * ## 上下文：上下文是状态机的内部数据存储，它可以在状态转换期间保持状态和执行动作时使用。
 *
 * 描述格式规范：
 *
 * - 历史堆栈 (historyStack): 用于存储所有历史记录的堆栈，最新记录位于栈顶。
 * - 历史记录指针 (historyPointer): 指向当前激活的历史记录索引，初始值为-1（表示未选择任何历史记录）。
 *
 * ## 状态节点 (States)：状态节点是状态机中的一个具体状态，它可以有子状态、入口动作、出口动作、转换等。
 *
 * - `idle`: 初始或待机状态，无操作进行。
 * - 撤销操作中 (undoing): 当前正在执行撤销操作。
 * - 重做操作中 (redoing): 当前正在执行重做操作。
 * - 浏览历史纪录中 (browsingHistory): 当前正在浏览历史记录。
 * - 是否可以继续撤销 (canUndo): 当前是否可以继续执行撤销操作。
 * - 是否可以继续重做 (canRedo): 当前是否可以继续执行重做操作。
 * - 浏览最新纪录中 (browsingLatest): 当前正在浏览最新的历史记录，不可撤销。
 *
 * ## 事件 (Events)：事件是状态机响应的信号，它可以触发状态转换。事件可以是用户输入、定时器、API 响应等。
 *
 * - 触发撤销操作 (UNDO_REQUESTED): 用户触发撤销操作的事件。
 * - 触发重做操作 (REDO_REQUESTED): 用户触发重做操作的事件。
 * - 开始浏览历史记录 (START_BROWSING_HISTORY): 开始浏览历史记录。
 * - 结束浏览历史记录 (STOP_BROWSING_HISTORY): 结束浏览历史记录并回到之前状态。
 * - 选择历史记录项 (SELECT_HISTORY_ITEM): 从浏览模式中选择一个历史记录项。
 * - 更新历史记录 (UPDATE_HISTORY): 应用新状态到历史记录栈，通常由外部操作触发。
 *
 * ## 延时事件 (Delayed Events)
 *
 * - 无延时事件，目前没有直接定义延时事件，但可以根据需求添加如撤销/重做操作的动画延迟完成事件。
 *
 * ## 服务 (Services)：服务是在状态机中长时间运行的外部进程或任务。它们可以用于处理异步操作，如 AJAX 请求、WebSockets、定时器等。
 *
 * - 保存历史记录 (saveHistory): 服务用于保存当前操作到历史记录堆栈中。
 * - 获取历史记录 (getHistory): 服务用于获取指定位置的历史记录。
 *
 * ## 转换 (Transitions)：转换是状态机从一个状态到另一个状态的移动。每个转换都由一个事件触发，并可能伴随着动作。
 *
 * 描述格式规范：【A 状态】通过【某事件】进入【B 状态】
 *
 * - 从浏览历史记录转换到撤销操作 (browseToUndo): 当用户在浏览历史记录时触发撤销操作。
 * - 从浏览历史记录转换到重做操作 (browseToRedo): 当用户在浏览历史记录时触发重做操作。
 * - 从 `idle` 状态接收 `UNDO_REQUESTED` 事件转换到 `undoing` 状态，并执行撤销动作。
 * - 从 `redoing` 状态在动作完成时返回到 `idle` 状态，并更新 `canRedo` 和 `canUndo` 状态。
 *
 * ### 延时转换
 *
 * 描述格式规范：【A状态】进入后【延时多久】自动进入【B 状态】
 *
 * ## 动作 (Actions)：动作是在状态转换时执行的任务。它们可以是同步的或异步的，并且可以改变状态机的状态或执行副作用。
 *
 * - 执行撤销操作 (performUndo): 执行撤销逻辑，弹出最近的历史记录并应用到当前状态。
 * - 执行重做操作 (performRedo): 执行重做逻辑，从历史记录栈中获取上一个记录并应用。
 * - 添加历史记录 (addHistory): 动作用于向历史记录堆栈中添加一条新记录。
 * - 更新历史记录指针 (updatePointer): 动作用于更新当前的历史记录指针。
 * - 切换撤销/重做状态 (toggleCanUndoRedoStatus): 根据 `historyStack` 的状态更新 `canUndo` 和 `canRedo`。
 *
 * ## 守卫 (Guards)：守卫是一个条件表达式，它决定是否允许一个转换发生。如果守卫返回 true，则转换发生；如果返回 false，则转换被阻止。
 *
 * - 检查是否可以撤销 (canPerformUndo): 判断是否可以执行撤销操作。
 * - 检查是否可以重做 (canPerformRedo): 判断是否可以执行重做操作。
 *
 * ## 活动 (Activities)：活动是在进入某个状态时启动，在离开该状态时停止的动作。它们通常用于执行后台任务或保持状态的持续行为，在某些状态下可能需要持续运行的后台任务，如监听外部数据变化自动更新历史记录。
 *
 * - 无活动。
 *
 * ## 嵌套状态 (Nested States)
 *
 * - 无嵌套状态。
 *
 * ## 并行状态 (Parallel States)
 *
 * - 无并行状态。
 *
 * ## 历史状态 (History States)
 *
 * - 无历史状态。
 */

import { setup, assign } from 'xstate';

// 定义上下文类型
interface HistoryContext {
  historyStack: unknown[];
  historyPointer: number;
}

// 定义事件类型
type HistoryEvent =
  | { type: 'UNDO_REQUESTED' }
  | { type: 'REDO_REQUESTED' }
  | { type: 'START_BROWSING_HISTORY' }
  | { type: 'STOP_BROWSING_HISTORY' }
  | { type: 'SELECT_HISTORY_ITEM'; index: number }
  | { type: 'UPDATE_HISTORY'; state: unknown };

// 创建状态机
const historyMachine = setup({
  types: {
    context: {} as HistoryContext,
    events: {} as HistoryEvent,
  },
  actions: {
    performUndo: assign({
      historyPointer: ({ context }) => context.historyPointer - 1,
    }),
    performRedo: assign({
      historyPointer: ({ context }) => context.historyPointer + 1,
    }),
    addHistory: assign({
      historyStack: ({ context, event }) => {
        if (event.type === 'UPDATE_HISTORY') {
          return [...context.historyStack, event.state];
        }
        return context.historyStack;
      },
    }),
    updatePointer: assign({
      historyPointer: ({ event }) =>
        event.type === 'SELECT_HISTORY_ITEM' ? event.index : -1,
    }),
    toggleCanUndoRedoStatus: assign({
      historyPointer: ({ context }) =>
        context.historyStack.length > 0 ? context.historyPointer : -1,
    }),
  },
  guards: {
    canPerformUndo: ({ context }) => context.historyPointer > 0,
    canPerformRedo: ({ context }) =>
      context.historyPointer < context.historyStack.length - 1,
  },
}).createMachine({
  id: 'history',
  initial: 'idle',
  context: {
    historyStack: [],
    historyPointer: -1,
  },
  states: {
    idle: {
      on: {
        UNDO_REQUESTED: {
          target: 'undoing',
          guard: 'canPerformUndo',
        },
        REDO_REQUESTED: {
          target: 'redoing',
          guard: 'canPerformRedo',
        },
        START_BROWSING_HISTORY: 'browsingHistory',
      },
    },
    undoing: {
      entry: 'performUndo',
      always: {
        target: 'idle',
        actions: 'toggleCanUndoRedoStatus',
      },
    },
    redoing: {
      entry: 'performRedo',
      always: {
        target: 'idle',
        actions: 'toggleCanUndoRedoStatus',
      },
    },
    browsingHistory: {
      on: {
        STOP_BROWSING_HISTORY: 'idle',
        SELECT_HISTORY_ITEM: {
          actions: 'updatePointer',
        },
      },
    },
  },
});

export default historyMachine;
