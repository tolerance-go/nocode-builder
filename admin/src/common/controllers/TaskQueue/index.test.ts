import { describe, it, expect, vi } from 'vitest';
import { TaskQueue } from '.';

describe('TaskQueue', () => {
  it('应该按顺序执行任务', async () => {
    const queue = new TaskQueue();
    const taskOrder: number[] = [];
    const task1 = vi.fn<[], Promise<void>>(async () => {
      taskOrder.push(1);
      return;
    });
    const task2 = vi.fn<[], Promise<void>>(async () => {
      taskOrder.push(2);
      return;
    });
    const task3 = vi.fn<[], Promise<void>>(async () => {
      taskOrder.push(3);
      return;
    });
    queue.add(task1);
    queue.add(task2);
    queue.add(task3);

    // 等待所有任务执行完毕
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(taskOrder).toEqual([1, 2, 3]);
  });

  it('任务成功执行时应调用 onTaskSuccess', async () => {
    const queue = new TaskQueue();
    const successCallback = vi.fn();
    queue.onTaskSuccess = successCallback;

    const task1 = vi.fn<[], Promise<void>>(async () => {});
    queue.add(task1);

    // 等待任务执行完毕
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(successCallback).toHaveBeenCalledTimes(1);
  });

  it('任务失败时应调用 onTaskFailure', async () => {
    const queue = new TaskQueue();
    const failureCallback = vi.fn();
    queue.onTaskFailure = failureCallback;

    const task1 = vi.fn<[], Promise<void>>(async () => {
      throw new Error('任务失败');
    });
    queue.add(task1);

    // 等待任务执行完毕
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(failureCallback).toHaveBeenCalledTimes(1);
  });

  it('应该处理多个成功和失败的任务', async () => {
    const queue = new TaskQueue();
    const successCallback = vi.fn();
    const failureCallback = vi.fn();
    queue.onTaskSuccess = successCallback;
    queue.onTaskFailure = failureCallback;

    const task1 = vi.fn<[], Promise<void>>(async () => {});
    const task2 = vi.fn<[], Promise<void>>(async () => {
      throw new Error('任务失败');
    });
    const task3 = vi.fn<[], Promise<void>>(async () => {});

    queue.add(task1);
    queue.add(task2);
    queue.add(task3);

    // 等待所有任务执行完毕
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(successCallback).toHaveBeenCalledTimes(2);
    expect(failureCallback).toHaveBeenCalledTimes(1);
  });
});
