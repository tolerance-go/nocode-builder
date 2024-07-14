import { assign, setup } from 'xstate';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecord,
  ProjectTreeNodeDataRecordItem,
} from '../../UIStoreManager/types';

export type 历史记录操作类型 = '插入' | '删除' | '移动' | '更新';

export interface 历史记录更新操作详情 {
  节点key: string;
  oldRecordItem: ProjectTreeNodeDataRecordItem;
  newRecordItem: ProjectTreeNodeDataRecordItem;
}

export interface 历史记录插入操作详情 {
  节点key: string;
  父节点key: string | null;
  index: number;
  recordItem: ProjectTreeNodeDataRecordItem;
}

export interface 历史记录删除操作详情 {
  节点keys: string[];
}

export interface 历史记录移动操作详情 {
  节点keys: string[];
  目标父节点key: string | null;
  index: number;
}

export type 历史记录操作详情 =
  | { type: '插入'; detail: 历史记录插入操作详情 }
  | { type: '删除'; detail: 历史记录删除操作详情 }
  | { type: '更新'; detail: 历史记录更新操作详情 }
  | { type: '移动'; detail: 历史记录移动操作详情 };

export type 历史记录 = {
  state: {
    treeNodes: ProjectStructureTreeDataNode[];
    treeDataRecord: ProjectTreeNodeDataRecord;
  };
  操作: 历史记录操作详情;
};

export interface 历史上下文 {
  历史堆栈: 历史记录[];
  历史指针: number;
}

export type 历史事件 =
  | { type: '撤销请求' }
  | { type: '重做请求' }
  | { type: '推入历史记录'; data: 历史记录 };

type Input = Partial<历史上下文>;

type Context = 历史上下文;

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
          return [
            ...context.历史堆栈.slice(0, context.历史指针 + 1),
            event.data,
          ];
        }
        return context.历史堆栈;
      },
      历史指针: ({ context, event }) => {
        if (event.type === '推入历史记录') {
          return context.历史指针 + 1;
        }
        return context.历史指针;
      },
    }),
  },
  guards: {
    可以撤销: ({ context }) => context.历史指针 > -1,
    可以重做: ({ context }) => context.历史指针 < context.历史堆栈.length - 1,
    是否浏览中: ({ context }) => context.历史指针 < context.历史堆栈.length - 1,
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
        重做请求: {
          target: '重做中',
          guard: '可以重做',
        },
        推入历史记录: {
          actions: '添加历史',
        },
      },
    },
    撤销中: {
      entry: '执行撤销',
      always: [
        {
          target: '浏览中',
          guard: '是否浏览中',
        },
        {
          target: '待机',
        },
      ],
    },
    重做中: {
      entry: '执行重做',
      always: [
        {
          target: '浏览中',
          guard: '是否浏览中',
        },
        {
          target: '待机',
        },
      ],
    },
    浏览中: {
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
