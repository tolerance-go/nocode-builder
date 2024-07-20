import { setup } from 'xstate';

export const 异步同步状态机 = setup({
  types: {
    events: {} as
      | {
          type: '开始同步';
        }
      | {
          type: '开始重试';
        }
      | {
          type: '同步失败';
        }
      | {
          type: '同步成功';
        }
      | {
          type: '重试失败';
        }
      | {
          type: '重试成功';
        },
  },
}).createMachine({
  id: '异步同步状态机',
  initial: '待机',
  states: {
    待机: {
      on: {
        开始同步: {
          target: '同步中',
        },
      },
    },
    同步中: {
      type: 'compound',
      states: {
        一般同步中: {
          on: {
            同步失败: {
              target: '同步已失败',
            },
            同步成功: {
              target: '待机',
            },
          },
        },
        重试中: {
          on: {
            重试失败: {
              target: '重试已失败',
            },
            重试成功: {
              target: '待机',
            },
          },
        },
      },
    },
    同步已失败: {
      on: {
        开始重试: {
          target: '同步中',
        },
      },
    },
    重试已失败: {},
  },
});
