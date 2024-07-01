import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import localforage from 'localforage';
import { UndoRedoManager } from './UndoRedoManager';

// 模拟 localforage 的 API
vi.mock('localforage', () => ({
  default: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
}));

describe('UndoRedoManager', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // 清除所有模拟调用数据
    (localforage.getItem as ReturnType<typeof vi.fn>).mockResolvedValue(null); // 默认返回 null
  });

  afterEach(() => {
    UndoRedoManager.destroyInstance(); // 销毁单例实例
  });

  it('在加载历史记录期间执行复杂操作并确保数据完整性', async () => {
    const savedHistory = {
      historyStack: [1, 2, 3],
      currentIndex: 2,
    };

    // 模拟加载历史记录时的返回数据，并增加延迟
    (localforage.getItem as ReturnType<typeof vi.fn>).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedHistory);
        }, 500); // 模拟延迟500ms
      });
    });

    const manager = await UndoRedoManager.initialize<number>();

    // 模拟加载历史记录期间执行操作
    const executePromise1 = manager.execute(4);
    const executePromise2 = manager.execute(5);
    const undoPromise = manager.undo();
    const redoPromise = manager.redo();

    await manager.loadingHistory; // 确保历史记录加载完毕

    await executePromise1; // 确保第一个执行操作完成
    await executePromise2; // 确保第二个执行操作完成
    await undoPromise; // 确保 undo 操作完成
    await redoPromise; // 确保 redo 操作完成

    // 验证加载历史记录后的状态
    expect(manager.getCurrentState()).toBe(5);
    expect(manager.currentIndex).toBe(4);
    expect(manager.historyStack).toEqual([1, 2, 3, 4, 5]);

    // 验证加载历史记录时是否调用了 localforage.getItem
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith('undoRedoHistory');

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(4);
    expect(localforage.setItem).toHaveBeenCalledWith('undoRedoHistory', {
      historyStack: [1, 2, 3, 4],
      currentIndex: 3,
    });
    expect(localforage.setItem).toHaveBeenCalledWith('undoRedoHistory', {
      historyStack: [1, 2, 3, 4, 5],
      currentIndex: 4,
    });
    expect(localforage.setItem).toHaveBeenCalledWith('undoRedoHistory', {
      historyStack: [1, 2, 3, 4],
      currentIndex: 3,
    });
  });

  it('应该加载保存的历史记录并执行操作保持数据一致性', async () => {
    const savedHistory = {
      historyStack: [1, 2, 3],
      currentIndex: 2,
    };

    // 模拟加载历史记录时的返回数据，并增加延迟
    (localforage.getItem as ReturnType<typeof vi.fn>).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedHistory);
        }, 500); // 模拟延迟500ms
      });
    });

    const manager = await UndoRedoManager.initialize<number>();

    // 模拟加载历史记录期间执行操作
    const executePromise = manager.execute(4);
    await manager.loadingHistory; // 确保历史记录加载完毕

    await executePromise; // 确保执行操作完成

    // 验证加载历史记录后的状态
    expect(manager.getCurrentState()).toBe(4);
    expect(manager.currentIndex).toBe(3);
    expect(manager.historyStack).toEqual([1, 2, 3, 4]);

    // 验证加载历史记录时是否调用了 localforage.getItem
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith('undoRedoHistory');

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith('undoRedoHistory', {
      historyStack: [1, 2, 3, 4],
      currentIndex: 3,
    });
  });

  it('应该加载保存的历史记录', async () => {
    const savedHistory = {
      historyStack: [1, 2, 3],
      currentIndex: 2,
    };

    // 模拟加载历史记录时的返回数据
    (localforage.getItem as ReturnType<typeof vi.fn>).mockResolvedValue(
      savedHistory,
    );

    const manager = await UndoRedoManager.initialize<number>();
    await manager.loadingHistory;

    // 验证加载历史记录后的状态
    expect(manager.getCurrentState()).toBe(3);
    expect(manager.currentIndex).toBe(2);
    expect(manager.historyStack).toEqual([1, 2, 3]);

    // 验证加载历史记录时是否调用了 localforage.getItem
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith('undoRedoHistory');
  });

  it('应该初始化并加载历史记录', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    // 验证加载历史记录时是否调用了 localforage.getItem
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith('undoRedoHistory');

    // 验证初始化后的状态
    expect(manager.getCurrentState()).toBeUndefined();
  });

  it('应该执行新状态并保存历史记录', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    await manager.loadingHistory;
    await manager.execute(1);
    const currentState = manager.getCurrentState();
    expect(currentState).toBe(1);

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.setItem).toHaveBeenCalledWith('undoRedoHistory', {
      historyStack: [1],
      currentIndex: 0,
    });
  });

  it('应该撤销最后一个操作', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    await manager.loadingHistory;
    await manager.execute(1);
    await manager.execute(2);
    const stateAfterFirstUndo = await manager.undo();
    expect(stateAfterFirstUndo).toBe(1);

    // 验证 undo 后的状态
    expect(manager.getCurrentState()).toBe(1);

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(3); // initialize, execute(1), execute(2), undo
  });

  it('应该重做最后一个撤销的操作', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    await manager.loadingHistory;
    await manager.execute(1);
    await manager.execute(2);
    await manager.undo();
    const stateAfterRedo = await manager.redo();
    expect(stateAfterRedo).toBe(2);

    // 验证 redo 后的状态
    expect(manager.getCurrentState()).toBe(2);

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(4); // initialize, execute(1), execute(2), undo, redo
  });

  it('不应该撤销超过第一个状态', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    await manager.loadingHistory;
    await manager.execute(1);
    await manager.undo();
    expect(manager.currentIndex).toEqual(0);

    // 验证 undo 后的状态
    expect(manager.getCurrentState()).toBe(1);

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(1); // execute(1)
  });

  it('不应该重做超过最后一个状态', async () => {
    const manager = await UndoRedoManager.initialize<number>();

    await manager.loadingHistory;
    await manager.execute(1);
    await manager.redo();
    const stateAfterRedo = await manager.redo();
    expect(stateAfterRedo).toBe(1);

    // 验证 redo 后的状态
    expect(manager.getCurrentState()).toBe(1);

    // 验证保存历史记录时是否调用了 localforage.setItem
    expect(localforage.setItem).toHaveBeenCalledTimes(1); // initialize, execute(1)
  });
});
