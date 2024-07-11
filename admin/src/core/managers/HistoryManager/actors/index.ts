import { delay } from '@/utils';
import {
  setup,
  assign,
  fromPromise,
  PromiseActorLogic,
  createActor,
} from 'xstate';

export type 历史记录 = {
  state: string;
};

/**
 * 模拟加载历史记录的服务函数
 * @returns {Promise<unknown[]>} 模拟的历史记录数据
 */
const 获取用户逻辑: PromiseActorLogic<历史记录[]> = fromPromise(
  async ({ input }) => {
    console.log(input);
    await delay(1000);
    return [
      { state: 'state1' },
      { state: 'state2' },
      { state: 'state3' },
    ] as 历史记录[];
    return [];
  },
);

/**
 * 定义上下文类型
 * - historyStack: 用于存储所有历史记录的堆栈，最新记录位于栈顶。
 * - historyPointer: 指向当前激活的历史记录索引，初始值为-1（表示未选择任何历史记录）。
 */
export interface 历史上下文 {
  历史堆栈: 历史记录[];
  历史指针: number;
}

/**
 * 定义事件类型
 * - 撤销请求: 用户触发撤销操作的事件。
 * - 重做请求: 用户触发重做操作的事件。
 * - 开始浏览历史: 开始浏览历史记录。
 * - 停止浏览历史: 结束浏览历史记录并回到之前状态。
 * - 选择历史项: 从浏览模式中选择一个历史记录项。
 * - 更新历史: 应用新状态到历史记录栈，通常由外部操作触发。
 */
export type 历史事件 =
  | { type: '撤销请求' }
  | { type: '重做请求' }
  | { type: '开始浏览历史' }
  | { type: '停止浏览历史' }
  | { type: '获取历史' }
  | { type: '选择历史项'; index: number }
  | { type: '更新历史'; state: 历史记录 }
  | { type: '重试加载历史' };

// 创建状态机
export const 历史状态机 = setup({
  types: {
    context: {} as 历史上下文,
    input: {} as 历史上下文,
    events: {} as 历史事件,
  },
  actions: {
    // 执行撤销操作: 执行撤销逻辑，弹出最近的历史记录并应用到当前状态。
    执行撤销: assign({
      历史指针: ({ context }) => context.历史指针 - 1,
    }),
    // 执行重做操作: 执行重做逻辑，从历史记录栈中获取上一个记录并应用。
    执行重做: assign({
      历史指针: ({ context }) => context.历史指针 + 1,
    }),
    // 添加历史记录: 动作用于向历史记录堆栈中添加一条新记录。
    添加历史: assign({
      历史堆栈: ({ context, event }) => {
        if (event.type === '更新历史') {
          return [...context.历史堆栈, event.state];
        }
        return context.历史堆栈;
      },
    }),
    // 更新历史记录指针: 动作用于更新当前的历史记录指针。
    更新指针: assign({
      历史指针: ({ event }) => (event.type === '选择历史项' ? event.index : -1),
    }),
    // 切换撤销/重做状态: 根据 `historyStack` 的状态更新 `canUndo` 和 `canRedo`。
    切换撤销重做状态: assign({
      历史指针: ({ context }) =>
        context.历史堆栈.length > 0 ? context.历史指针 : -1,
    }),
  },
  guards: {
    // 检查是否可以撤销: 判断是否可以执行撤销操作。
    可以撤销: ({ context }) => context.历史指针 > 0,
    // 检查是否可以重做: 判断是否可以执行重做操作。
    可以重做: ({ context }) => context.历史指针 < context.历史堆栈.length - 1,
  },
  actors: {
    获取用户: 获取用户逻辑,
  },
}).createMachine({
  id: '历史',
  initial: '待机',
  context: ({ input }) => ({
    历史堆栈: input.历史堆栈,
    历史指针: input.历史指针,
  }),
  states: {
    // 待机状态: 初始或待机状态，无操作进行。
    待机: {
      on: {
        // 接收 撤销请求 事件，转换到 撤销中 状态，并执行撤销动作。
        撤销请求: {
          target: '撤销中',
          guard: '可以撤销',
        },
        // 接收 重做请求 事件，转换到 重做中 状态，并执行重做动作。
        重做请求: {
          target: '重做中',
          guard: '可以重做',
        },
        // 接收 开始浏览历史 事件，转换到 浏览历史 状态。
        开始浏览历史: '浏览历史',
        // 开始加载历史记录
        获取历史: '加载历史',
      },
    },
    // 撤销操作中: 当前正在执行撤销操作。
    撤销中: {
      entry: '执行撤销',
      always: {
        target: '待机',
        actions: '切换撤销重做状态',
      },
    },
    // 重做操作中: 当前正在执行重做操作。
    重做中: {
      entry: '执行重做',
      always: {
        target: '待机',
        actions: '切换撤销重做状态',
      },
    },
    // 浏览历史记录中: 当前正在浏览历史记录。
    浏览历史: {
      on: {
        // 接收 停止浏览历史 事件，转换到 待机 状态。
        停止浏览历史: '待机',
        // 接收 选择历史项 事件，更新历史记录指针。
        选择历史项: {
          actions: '更新指针',
        },
      },
    },
    // 加载历史纪录中
    加载历史: {
      invoke: {
        id: '获取用户',
        src: '获取用户',
        onDone: {
          target: '待机',
          actions: assign({
            历史堆栈: ({ event }) => event.output,
          }),
        },
        onError: {
          target: '失败',
        },
      },
    },
    // 加载历史记录失败
    失败: {
      on: {
        重试加载历史: '加载历史', // 重试加载历史记录
      },
    },
  },
});

export const 历史状态机Actor = createActor(历史状态机);
