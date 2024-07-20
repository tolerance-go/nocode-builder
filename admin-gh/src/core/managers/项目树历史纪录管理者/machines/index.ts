import { assign, setup } from 'xstate';
import { 历史上下文, 历史事件 } from '../types';

type Input = Partial<历史上下文>;

type Context = 历史上下文;

const maxStackSize = 100;

// 创建状态机
export const 历史状态机 = setup({
  types: {
    context: {} as Context,
    input: {} as Input,
    events: {} as 历史事件,
  },
  actions: {
    执行撤销: assign({
      历史指针: ({ context }) => context.历史指针 - 1,
    }),
    执行重做: assign({
      历史指针: ({ context }) => context.历史指针 + 1,
    }),
    添加历史: assign({
      历史堆栈: ({ context, event }) => {
        if (event.type === '推入历史记录') {
          const newStack = [
            ...context.历史堆栈.slice(0, context.历史指针 + 1),
            event.data,
          ];
          return newStack.length > maxStackSize
            ? newStack.slice(newStack.length - maxStackSize)
            : newStack;
        }
        return context.历史堆栈;
      },
      历史指针: ({ context, event }) => {
        if (event.type === '推入历史记录') {
          return Math.min(context.历史指针 + 1, maxStackSize - 1);
        }
        return context.历史指针;
      },
    }),
  },
  guards: {
    可以撤销: ({ context }) => context.历史指针 > -1,
    可以重做: ({ context }) => context.历史指针 < context.历史堆栈.length - 1,
    是否浏览历史中: ({ context }) =>
      context.历史指针 < context.历史堆栈.length - 1,
  },
}).createMachine({
  id: '历史',
  initial: '待机',
  context: ({ input }) => ({
    历史堆栈: input.历史堆栈 ?? [],
    历史指针: input.历史指针 ?? -1,
  }),
  states: {
    待机: {
      on: {
        撤销请求: {
          target: '撤销中',
          guard: '可以撤销',
        },
        推入历史记录: {
          actions: '添加历史',
        },
      },
    },
    撤销中: {
      entry: '执行撤销',
      always: {
        target: '浏览历史中',
      },
    },
    重做中: {
      entry: '执行重做',
      always: [
        {
          target: '浏览历史中',
          guard: '是否浏览历史中',
        },
        {
          target: '待机',
        },
      ],
    },
    浏览历史中: {
      on: {
        推入历史记录: {
          actions: '添加历史',
          target: '待机',
        },
        撤销请求: {
          target: '撤销中',
          guard: '可以撤销',
        },
        重做请求: {
          target: '重做中',
          guard: '可以重做',
        },
      },
    },
  },
});
