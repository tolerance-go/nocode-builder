import { describe, it, expect } from 'vitest';
import { updateLocalStateWithDiffs } from './updateLocalStateWithDiffs';

describe('updateLocalStateWithDiffs 函数测试', () => {
  it('应正确处理新增字段', () => {
    const localState = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const programState = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const diffs = {
      added: [['b', 'd']],
      changed: [],
    };

    const updatedState = updateLocalStateWithDiffs(
      localState,
      programState,
      diffs,
    );

    expect(updatedState).toEqual({
      a: 1,
      b: {
        c: 2,
        d: 3, // 新增的字段
      },
    });
  });

  it('应正确处理类型变化的字段', () => {
    const localState = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const programState = {
      a: 1,
      b: {
        c: '变化后的类型', // 类型发生变化
      },
    };

    const diffs = {
      added: [],
      changed: [['b', 'c']],
    };

    const updatedState = updateLocalStateWithDiffs(
      localState,
      programState,
      diffs,
    );

    expect(updatedState).toEqual({
      a: 1,
      b: {
        c: '变化后的类型', // 修改后的字段类型
      },
    });
  });

  it('应同时处理新增和类型变化的字段', () => {
    const localState = {
      a: 1,
      b: {
        c: 2,
      },
    };

    const programState = {
      a: 1,
      b: {
        c: '变化后的类型', // 类型发生变化
        d: 3, // 新增的字段
      },
    };

    const diffs = {
      added: [['b', 'd']],
      changed: [['b', 'c']],
    };

    const updatedState = updateLocalStateWithDiffs(
      localState,
      programState,
      diffs,
    );

    expect(updatedState).toEqual({
      a: 1,
      b: {
        c: '变化后的类型', // 修改后的字段类型
        d: 3, // 新增的字段
      },
    });
  });

  it('应处理嵌套对象中的字段更新', () => {
    const localState = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    const programState = {
      a: {
        b: {
          c: 1,
          d: 2, // 新增的字段
        },
      },
    };

    const diffs = {
      added: [['a', 'b', 'd']],
      changed: [],
    };

    const updatedState = updateLocalStateWithDiffs(
      localState,
      programState,
      diffs,
    );

    expect(updatedState).toEqual({
      a: {
        b: {
          c: 1,
          d: 2, // 新增的字段
        },
      },
    });
  });

  it('应正确处理空的 diff', () => {
    const localState = {
      a: 1,
      b: 2,
    };

    const programState = {
      a: 1,
      b: 2,
    };

    const diffs = {
      added: [],
      changed: [],
    };

    const updatedState = updateLocalStateWithDiffs(
      localState,
      programState,
      diffs,
    );

    expect(updatedState).toEqual(localState);
  });
});
