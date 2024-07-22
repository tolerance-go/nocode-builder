import { describe, it, expect, beforeEach } from 'vitest';
import { PersistTaskManager } from '.';

interface TestTask {
  key: string;
  data: string;
}

describe('PersistTaskManager', () => {
  let taskManager: PersistTaskManager;

  beforeEach(() => {
    taskManager = new PersistTaskManager();
  });

  it('应该成功添加一个持久化任务', () => {
    const task: TestTask = { key: 'testKey', data: 'testData' };
    taskManager.addPersistTask(task);

    expect(taskManager.isQueueEmpty()).toBe(false);
  });

  it('应该成功获取下一个持久化任务', () => {
    const task1: TestTask = { key: 'testKey1', data: 'testData1' };
    const task2: TestTask = { key: 'testKey2', data: 'testData2' };
    taskManager.addPersistTask(task1);
    taskManager.addPersistTask(task2);

    const nextTask = taskManager.getNextTask();
    expect(nextTask).toEqual(task1);
    expect(taskManager.isQueueEmpty()).toBe(false);
  });

  it('队列为空时应该返回 undefined', () => {
    const nextTask = taskManager.getNextTask();
    expect(nextTask).toBeUndefined();
  });

  it('应该正确判断任务队列是否为空', () => {
    expect(taskManager.isQueueEmpty()).toBe(true);

    const task: TestTask = { key: 'testKey', data: 'testData' };
    taskManager.addPersistTask(task);

    expect(taskManager.isQueueEmpty()).toBe(false);
  });
});
