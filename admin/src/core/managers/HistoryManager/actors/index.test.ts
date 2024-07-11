import { delay } from '@/utils';
import { describe, expect, it, vi } from 'vitest';
import { createActor } from 'xstate';
import { 历史状态机 } from '.';

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
        历史堆栈: [{ state: 'state1' }, { state: 'state2' }],
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
        历史堆栈: [{ state: 'state1' }, { state: 'state2' }],
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
        历史堆栈: [{ state: 'state1' }],
        历史指针: 0,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '更新历史', state: { state: 'state2' } });
    expect(历史状态机Actor.getSnapshot().context.历史堆栈).toHaveLength(2);
  });

  it('应该能够选择历史项', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [{ state: 'state1' }, { state: 'state2' }],
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
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '获取历史' });

    await delay(2000);

    expect(历史状态机Actor.getSnapshot().context.历史堆栈).toEqual([
      { state: 'state1' },
      { state: 'state2' },
      { state: 'state3' },
    ]);
  });

  it('加载历史记录失败时应能重试', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    });
    历史状态机Actor.start();
    历史状态机Actor.send({ type: '获取历史' });
    历史状态机Actor.send({ type: '重试加载历史' });
    expect(历史状态机Actor.getSnapshot().value).toBe('加载历史中');
  });
});
