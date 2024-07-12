import { assign, fromPromise, PromiseActorLogic, setup } from 'xstate';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '../../UIStoreManager/types';

export type 操作类型 = '插入' | '删除' | '移动' | '更新';

export interface 更新操作详情 {
  节点key: string;
  oldRecordItem: ProjectTreeNodeDataRecordItem;
  newRecordItem: ProjectTreeNodeDataRecordItem;
}

export interface 插入操作详情 {
  节点key: string;
  父节点key: string;
  index: number;
  recordItem: ProjectTreeNodeDataRecordItem;
}

export interface 删除操作详情 {
  节点keys: string[];
}

export interface 移动操作详情 {
  节点keys: string[];
  目标父节点key: string;
}

export type 操作详情 =
  | { 类型: '插入'; 详情: 插入操作详情 }
  | { 类型: '删除'; 详情: 删除操作详情 }
  | { 类型: '更新'; 详情: 更新操作详情 }
  | { 类型: '移动'; 详情: 移动操作详情 };

export type 历史记录 = {
  state: ProjectStructureTreeDataNode[];
  操作: 操作详情;
};

type 请求历史记录Fn = () => Promise<历史记录[]>;

const 请求历史记录逻辑: PromiseActorLogic<历史记录[], Input> = fromPromise(
  async ({ input }) => {
    return (await input.request?.()) ?? [];
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
  | { type: '更新历史'; data: 历史记录 }
  | { type: '重试加载历史' };

type Input = Partial<历史上下文> & {
  request?: 请求历史记录Fn;
};

type Context = 历史上下文 & {
  request?: 请求历史记录Fn;
};

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
        if (event.type === '更新历史') {
          return [...context.历史堆栈, event.data];
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
    历史堆栈: input.历史堆栈 ?? [],
    历史指针: input.历史指针 ?? -1,
    request: input.request,
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
        input: ({ context }) => ({ request: context.request }),
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
