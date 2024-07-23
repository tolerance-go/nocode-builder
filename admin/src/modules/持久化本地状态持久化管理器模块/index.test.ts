import { EngineBase } from '@/base';
import localforage from 'localforage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PersistTask, 持久化本地状态持久化管理器模块 } from '.';
import { clearMockLocalforageData, mockLocalforage } from '@/common/tests';
import { EngineManagerBase } from '@/base/EngineManager';

class TestEngineManager extends EngineManagerBase {}

class TestEngine extends EngineBase {
  protected providerModules(): void {
    super.providerModules(new 持久化本地状态持久化管理器模块(this));
  }
}

interface TestTask {
  key: string;
  data: string;
}

describe('PersistTaskManager with EngineBase', () => {
  let engine: TestEngine;
  let taskManager: 持久化本地状态持久化管理器模块;

  beforeEach(async () => {
    mockLocalforage();
    const engineManager = new TestEngineManager();
    engine = new TestEngine(engineManager);
    await engine.launch();
    taskManager = engine.getModule(持久化本地状态持久化管理器模块);
  });

  afterEach(() => {
    vi.restoreAllMocks(); // 恢复所有的 mock
    clearMockLocalforageData(); // 清除 mock 数据
  });

  it('应该成功添加一个持久化任务并保存到本地存储', async () => {
    const task: TestTask = { key: 'testKey', data: 'testData' };
    await taskManager.addPersistTask(task);

    expect(taskManager.isQueueEmpty()).toBe(false);

    const storedTasks = await localforage.getItem('persistTasks');
    expect(storedTasks).toEqual([task]);
  });

  it('应该成功获取下一个持久化任务并更新本地存储', async () => {
    const task1: TestTask = { key: 'testKey1', data: 'testData1' };
    const task2: TestTask = { key: 'testKey2', data: 'testData2' };
    await taskManager.addPersistTask(task1);
    await taskManager.addPersistTask(task2);

    const nextTask = await taskManager.getNextTask();
    expect(nextTask).toEqual(task1);
    expect(taskManager.isQueueEmpty()).toBe(false);

    const storedTasks = await localforage.getItem('persistTasks');
    expect(storedTasks).toEqual([task2]);
  });

  it('队列为空时应该返回 undefined 并保持本地存储为空', async () => {
    const nextTask = await taskManager.getNextTask();
    expect(nextTask).toBeUndefined();
    const storedTasks = await localforage.getItem('persistTasks');
    expect(storedTasks).toEqual([]);
  });

  it('应该正确判断任务队列是否为空', async () => {
    expect(taskManager.isQueueEmpty()).toBe(true);

    const task: TestTask = { key: 'testKey', data: 'testData' };
    await taskManager.addPersistTask(task);

    expect(taskManager.isQueueEmpty()).toBe(false);
  });

  it('初始化时应该从本地存储加载任务队列', async () => {
    const tasks: PersistTask<unknown>[] = [
      { key: 'testKey1', data: 'testData1' },
      { key: 'testKey2', data: 'testData2' },
    ];
    await localforage.setItem('persistTasks', tasks);

    const engineManager = new TestEngineManager();
    const newEngine = new TestEngine(engineManager);
    await newEngine.launch();
    const newTaskManager = newEngine.getModule(持久化本地状态持久化管理器模块);
    expect(newTaskManager.isQueueEmpty()).toBe(false);

    const nextTask = await newTaskManager.getNextTask();
    expect(nextTask).toEqual(tasks[0]);
  });
});
