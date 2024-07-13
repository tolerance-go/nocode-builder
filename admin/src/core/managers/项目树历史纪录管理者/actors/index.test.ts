import { describe, it, expect } from 'vitest';
import { createActor } from 'xstate';
import { 历史记录, 历史状态机 } from '.';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '../../UIStoreManager';

describe('历史状态机', () => {
  const 创建Mock记录 = (key: string): ProjectStructureTreeDataNode => ({
    key,
  });

  const 创建Mock历史记录 = (key: string): 历史记录 => ({
    state: [创建Mock记录(key)],
    操作: {
      type: '插入',
      detail: {
        节点key: key,
        父节点key: null,
        index: 0,
        recordItem: {} as ProjectTreeNodeDataRecordItem,
      },
    },
  });

  it('应该在待机状态开始', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });

  it('应该处理推入历史记录事件并添加新记录', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    const 历史记录 = 创建Mock历史记录('1');
    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录 });

    const state = 历史状态机Actor.getSnapshot().context;
    expect(state.历史堆栈.length).toBe(1);
    expect(state.历史指针).toBe(0);
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });

  it('应该处理撤销请求事件并移动到撤销中状态', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');

    历史状态机Actor.send({ type: '推入历史记录', data: 创建Mock历史记录('1') });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(0);
    expect(历史状态机Actor.getSnapshot().context.历史堆栈.length).toBe(1);
    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('浏览中');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(-1);
    expect(历史状态机Actor.getSnapshot().context.历史堆栈.length).toBe(1);
  });

  it('应该处理重做请求事件并移动到重做中状态', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    历史状态机Actor.send({ type: '重做请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');

    历史状态机Actor.send({ type: '推入历史记录', data: 创建Mock历史记录('1') });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(0);
    expect(历史状态机Actor.getSnapshot().context.历史堆栈.length).toBe(1);
    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('浏览中');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(-1);
    expect(历史状态机Actor.getSnapshot().context.历史堆栈.length).toBe(1);
    历史状态机Actor.send({ type: '重做请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(0);
    expect(历史状态机Actor.getSnapshot().context.历史堆栈.length).toBe(1);
  });

  it('当指针小于堆栈长度减 1 时应该移动到浏览中状态', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    const 历史记录1 = 创建Mock历史记录('1');
    const 历史记录2 = 创建Mock历史记录('2');

    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录1 });
    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录2 });

    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('浏览中');
    expect(历史状态机Actor.getSnapshot().context.历史指针).toBe(0);
  });

  it('应该在浏览中状态下处理推入历史记录并截断未来记录', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    const 历史记录1 = 创建Mock历史记录('1');
    const 历史记录2 = 创建Mock历史记录('2');
    const 历史记录3 = 创建Mock历史记录('3');

    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录1 });
    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录2 });

    历史状态机Actor.send({ type: '撤销请求' });

    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录3 });

    const state = 历史状态机Actor.getSnapshot().context;
    expect(state.历史堆栈.length).toBe(2);
    expect(state.历史堆栈[1]).toEqual(历史记录3);
    expect(state.历史指针).toBe(1);
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });

  it('当指针在 -1 时应该禁止撤销', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    历史状态机Actor.send({ type: '撤销请求' });
    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });

  it('当指针在堆栈长度减 1 时应该禁止重做', () => {
    const 历史状态机Actor = createActor(历史状态机, {
      input: {
        历史堆栈: [],
        历史指针: -1,
      },
    }).start();

    const 历史记录1 = 创建Mock历史记录('1');

    历史状态机Actor.send({ type: '推入历史记录', data: 历史记录1 });
    历史状态机Actor.send({ type: '重做请求' });

    expect(历史状态机Actor.getSnapshot().value).toBe('待机');
  });
});
