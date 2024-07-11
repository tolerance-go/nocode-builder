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

const 请求历史记录逻辑: PromiseActorLogic<历史记录[]> = fromPromise(
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

export interface 历史上下文 {
  历史堆栈: 历史记录[];
  历史指针: number;
}

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
    执行撤销: assign({
      历史指针: ({ context }) => context.历史指针 - 1,
    }),
    执行重做: assign({
      历史指针: ({ context }) => context.历史指针 + 1,
    }),
    添加历史: assign({
      历史堆栈: ({ context, event }) => {
        if (event.type === '更新历史') {
          return [...context.历史堆栈, event.state];
        }
        return context.历史堆栈;
      },
    }),
    更新指针: assign({
      历史指针: ({ event }) => (event.type === '选择历史项' ? event.index : -1),
    }),
    切换撤销重做状态: assign({
      历史指针: ({ context }) =>
        context.历史堆栈.length > 0 ? context.历史指针 : -1,
    }),
  },
  guards: {
    可以撤销: ({ context }) => context.历史指针 > 0,
    可以重做: ({ context }) => context.历史指针 < context.历史堆栈.length - 1,
  },
  actors: {
    请求历史记录: 请求历史记录逻辑,
  },
}).createMachine({
  id: '历史',
  initial: '待机',
  context: ({ input }) => ({
    历史堆栈: input.历史堆栈,
    历史指针: input.历史指针,
  }),
  states: {
    待机: {
      on: {
        撤销请求: {
          target: '撤销中',
          guard: '可以撤销',
        },
        重做请求: {
          target: '重做中',
          guard: '可以重做',
        },
        开始浏览历史: '浏览历史',
        获取历史: '加载历史中',
        更新历史: {
          actions: '添加历史',
        },
      },
    },
    撤销中: {
      entry: '执行撤销',
      always: {
        target: '待机',
        actions: '切换撤销重做状态',
      },
    },
    重做中: {
      entry: '执行重做',
      always: {
        target: '待机',
        actions: '切换撤销重做状态',
      },
    },
    浏览历史: {
      on: {
        停止浏览历史: '待机',
        选择历史项: {
          actions: '更新指针',
        },
      },
    },
    加载历史中: {
      invoke: {
        id: '请求历史记录',
        src: '请求历史记录',
        onDone: {
          target: '待机',
          actions: assign({
            历史堆栈: ({ event }) => event.output,
          }),
        },
        onError: {
          target: '加载失败',
        },
      },
    },
    加载失败: {
      on: {
        重试加载历史: '加载历史中',
      },
    },
  },
});

export const 历史状态机Actor = createActor(历史状态机, {
  input: {
    历史堆栈: [],
    历史指针: -1,
  },
});
