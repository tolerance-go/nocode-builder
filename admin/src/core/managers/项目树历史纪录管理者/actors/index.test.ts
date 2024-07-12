import { delay } from '@/utils';
import { describe, expect, it } from 'vitest';
import { createActor } from 'xstate';
import { 历史状态机, 操作详情 } from '.';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '../../UIStoreManager/types';

// 帮助函数，用于创建历史记录
const 创建历史记录 = (
  state: ProjectStructureTreeDataNode[],
  操作: 操作详情,
) => ({ state, 操作 });

describe('历史状态机', () => {
  it('初始状态应该是待机状态', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    });
    历史状态机Actor.start();
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });

  it('应该能够执行撤销操作', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [
          创建历史记录([], {
            类型: '插入',
            详情: {
              节点key: '1',
              父节点key: '0',
              index: 0,
              recordItem: {} as ProjectTreeNodeDataRecordItem,
            },
          }),
          创建历史记录([], { 类型: '删除', 详情: { 节点keys: ['1'] } }),
        ],
        历史指针: 1,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(0);
  });

  it('应该能够执行重做操作', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [
          创建历史记录([], {
            类型: '插入',
            详情: {
              节点key: '1',
              父节点key: '0',
              index: 0,
              recordItem: {} as ProjectTreeNodeDataRecordItem,
            },
          }),
          创建历史记录([], { 类型: '删除', 详情: { 节点keys: ['1'] } }),
        ],
        历史指针: 0,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '重做请求' });
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(1);
  });

  it('应该能够添加历史记录', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [
          创建历史记录([], {
            类型: '插入',
            详情: {
              节点key: '1',
              父节点key: '0',
              index: 0,
              recordItem: {} as ProjectTreeNodeDataRecordItem,
            },
          }),
        ],
        历史指针: 0,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({
      type: '更新历史',
      data: {
        state: [],
        操作: { 类型: '删除', 详情: { 节点keys: ['1'] } },
      },
    });
    expect(历史状态机Actor.getSnapshot().context.历史堆栈).toHaveLength(2);
  });

  it('应该能够选择历史项', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [
          创建历史记录([], {
            类型: '插入',
            详情: {
              节点key: '1',
              父节点key: '0',
              index: 0,
              recordItem: {} as ProjectTreeNodeDataRecordItem,
            },
          }),
          创建历史记录([], { 类型: '删除', 详情: { 节点keys: ['1'] } }),
        ],
        历史指针: 0,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '开始浏览历史' });
    历史状态机Actor.send({ type: '选择历史项', index: 1 });
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(1);
  });

  it('应该加载历史记录', async () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
        request: async () => {
          return [
            创建历史记录([], {
              类型: '插入',
              详情: {
                节点key: '1',
                父节点key: '0',
                index: 0,
                recordItem: {} as ProjectTreeNodeDataRecordItem,
              },
            }),
            创建历史记录([], { 类型: '删除', 详情: { 节点keys: ['1'] } }),
            创建历史记录([], {
              类型: '移动',
              详情: { 节点keys: ['1'], 目标父节点key: '2' },
            }),
          ];
        },
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '获取历史' });

    await delay(200);

    expect(历史状态机Actor.getSnapshot().context.历史堆栈).toEqual([
      创建历史记录([], {
        类型: '插入',
        详情: {
          节点key: '1',
          父节点key: '0',
          index: 0,
          recordItem: {} as ProjectTreeNodeDataRecordItem,
        },
      }),
      创建历史记录([], { 类型: '删除', 详情: { 节点keys: ['1'] } }),
      创建历史记录([], {
        类型: '移动',
        详情: { 节点keys: ['1'], 目标父节点key: '2' },
      }),
    ]);
  });

  it('加载历史记录失败时应能重试', async () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
        request: async () => {
          throw new Error('加载失败');
        },
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '获取历史' });
    await delay(200);
    expect(历史状态机Actor.getSnapshot().value).toBe('加载失败');
  });
});
