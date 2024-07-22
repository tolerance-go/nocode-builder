import { EngineBase } from '@/base';
import localforage from 'localforage';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PersistTask, PersistTaskManager } from '../PersistTaskManager';
import { cloneDeep } from 'lodash-es';
import { clearMockLocalforageData, mockLocalforage } from '@/common/tests';

class TestEngine extends EngineBase {
  protected providerModules(): void {
    super.providerModules(new PersistTaskManager());
  }
}

interface TestTask {
  key: string;
  data: string;
}

describe('PersistTaskManager with EngineBase', () => {
  let engine: TestEngine;
  let taskManager: PersistTaskManager;
  const key = 'persistTasks';

  beforeEach(async () => {
    mockLocalforage(); // 设置 localforage 的 spy
    engine = new TestEngine();
    await engine.launch();
    taskManager = engine.getModule(PersistTaskManager);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    clearMockLocalforageData(); // 清除 mock 数据
  });

  it('应该成功添加一个持久化任务并保存到本地存储', async () => {
    const task: TestTask = { key: 'testKey', data: 'testData' };
    await taskManager.addPersistTask(task);

    expect(taskManager.isQueueEmpty()).toBe(false);

    const storedTasks = await localforage.getItem(key);
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

    const storedTasks = await localforage.getItem(key);
    expect(storedTasks).toEqual([task2]);
  });

  it('队列为空时应该返回 undefined 并保持本地存储为空', async () => {
    const nextTask = await taskManager.getNextTask();
    expect(nextTask).toBeUndefined();
    const storedTasks = await localforage.getItem(key);
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
    localData[key] = tasks;
    const newEngine = new TestEngine();
    await newEngine.launch();
    const newTaskManager = newEngine.getModule(PersistTaskManager);
    expect(newTaskManager.isQueueEmpty()).toBe(false);

    const nextTask = await newTaskManager.getNextTask();
    expect(nextTask).toEqual(tasks[0]);
  });
});
