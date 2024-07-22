import { ModuleBase } from '@/base';
import localforage from 'localforage';

// 定义一个接口来描述持久化任务
export interface PersistTask<T> {
  key: string;
  data: T;
}

/**
 * 持久化任务管理器模块
 *
 * 负责管理持久化任务的添加、处理和执行状态。
 */
export class 持久化本地状态持久化管理器模块 extends ModuleBase {
  private persistTasks: PersistTask<unknown>[] = []; // 内部任务队列
  private storageKey = 'persistTasks'; // 用于本地存储的键

  // 添加一个持久化任务到队列
  async addPersistTask<T>(task: PersistTask<T>): Promise<void> {
    this.persistTasks.push(task);
    await this.saveTasksToStorage(); // 每次添加任务后保存到本地存储
  }

  // 获取下一个持久化任务
  async getNextTask(): Promise<PersistTask<unknown> | undefined> {
    const task = this.persistTasks.shift();
    await this.saveTasksToStorage(); // 每次获取任务后保存到本地存储
    return task;
  }

  // 检查任务队列是否为空
  isQueueEmpty(): boolean {
    return this.persistTasks.length === 0;
  }

  protected async onSetup(): Promise<void> {
    console.log('持久化任务管理器模块 setup 完成');
    await this.loadTasksFromStorage(); // 初始化时从本地存储加载任务
  }
  protected async onStart(): Promise<void> {
    console.log('持久化任务管理器模块 start 完成');
  }
  // 将任务队列保存到本地存储
  private async saveTasksToStorage(): Promise<void> {
    await localforage.setItem(this.storageKey, this.persistTasks);
  }

  // 从本地存储加载任务队列
  private async loadTasksFromStorage(): Promise<void> {
    const tasks = await localforage.getItem<PersistTask<unknown>[]>(
      this.storageKey,
    );
    if (tasks) {
      this.persistTasks = tasks;
    }
  }
}
