import { setup, SnapshotFrom } from 'xstate';

export const 历史记录远程同步状态机 = setup({
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
          type: '重试失败';
        }
      | {
          type: '同步成功';
        },
  },
}).createMachine({
  id: '同步历史',
  initial: '待机',
  states: {
    待机: {
      on: {
        开始同步: {
          target: '同步中.正常同步中',
        },
      },
    },
    同步中: {
      type: 'compound',
      initial: '正常同步中',
      states: {
        重试中: {
          on: {
            重试失败: {
              target: '#同步历史.同步已失败',
            },
          },
        },
        正常同步中: {},
      },
      on: {
        同步失败: {
          target: '同步已失败',
        },
        同步成功: {
          target: '同步已成功',
        },
      },
    },
    同步已失败: {
      on: {
        开始重试: {
          target: '同步中.重试中',
        },
      },
    },
    同步已成功: {
      always: {
        target: '待机',
      },
    },
  },
});

export type 历史记录远程同步状态机SnapshotType = SnapshotFrom<
  typeof 历史记录远程同步状态机
>;
