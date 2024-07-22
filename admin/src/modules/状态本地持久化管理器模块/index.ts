import { ModuleBase } from '@/base';
import { TaskQueue } from '@/common/controllers/TaskQueue';
import localforage from 'localforage';
import { PersistTaskManager } from '../PersistTaskManager';

/**
 * 状态本地持久化管理器模块
 *
 * 是什么: 一个用于管理本地状态持久化的模块类
 *
 * 为了什么用户: 需要将应用程序状态持久化到本地存储，并能够恢复和管理持久化任务的开发者
 *
 * 解决什么问题: 该模块类通过管理持久化任务队列，确保状态数据按顺序持久化，并在成功或失败时进行相应处理
 *
 * 以便于: 开发者能够轻松地将应用状态持久化到本地存储，并在应用重启时恢复未完成的持久化任务
 */
export class 状态本地持久化管理器模块 extends ModuleBase {
  private taskQueue: TaskQueue;

  constructor() {
    super();
    this.taskQueue = new TaskQueue();
    this.taskQueue.onTaskSuccess = this.onTaskSuccess.bind(this);
    this.taskQueue.onTaskFailure = this.onTaskFailure.bind(this);
  }

  // 添加一个持久化任务到队列
  async addPersistTask<T>(key: string, data: T): Promise<void> {
    this.getDependModule(PersistTaskManager).addPersistTask({ key, data });
    await this.processNextTask(); // 尝试处理下一个任务
  }
  // 示例持久化任务
  async persistData<T>(key: string, data: T): Promise<void> {
    await this.addPersistTask(key, data);
  }
  // 从本地存储中获取数据
  async getData<T>(key: string): Promise<T | null> {
    try {
      const data = await localforage.getItem<T>(key);
      console.log(`从本地获取数据: ${key}`, data);
      return data;
    } catch (error) {
      console.error(`获取数据失败: ${key}`, error);
      throw error;
    }
  }
  // 从本地存储中删除数据
  async removeData(key: string): Promise<void> {
    await this.addTask(async () => {
      try {
        await localforage.removeItem(key);
        console.log(`数据已从本地删除: ${key}`);
      } catch (error) {
        console.error(`删除数据失败: ${key}`, error);
        throw error;
      }
    });
  }
  protected requireModules(): void {
    super.requireModules(new PersistTaskManager());
  }

  // 在 setup 阶段执行的逻辑
  protected async onSetup(): Promise<void> {
    // 这里可以添加模块 setup 阶段需要执行的逻辑
    console.log('本地状态持久化管理器模块 setup 完成');
  }
  // 在 start 阶段执行的逻辑
  protected async onStart(): Promise<void> {
    // 这里可以添加模块 start 阶段需要执行的逻辑
    console.log('本地状态持久化管理器模块 start 完成');
  }
  // 处理下一个任务
  private async processNextTask(): Promise<void> {
    if (
      this.taskQueue.isIdle() &&
      !this.getDependModule(PersistTaskManager).isQueueEmpty()
    ) {
      const task = this.getDependModule(PersistTaskManager).getNextTask()!;
      await this.addTask(async () => {
        await this.saveDataLocally(task.key, task.data);
      });
    }
  }

  // 异步添加任务到队列
  private async addTask(task: () => Promise<void>): Promise<void> {
    await this.taskQueue.add(task);
  }

  // 任务成功的回调
  private async onTaskSuccess(): Promise<void> {
    console.log('任务成功执行');
    await this.processNextTask(); // 处理下一个任务
  }

  // 任务失败的回调
  private async onTaskFailure(): Promise<void> {
    console.log('任务执行失败');
    await this.processNextTask(); // 处理下一个任务
  }

  // 使用 localforage 保存数据到本地
  private async saveDataLocally(key: string, data: unknown): Promise<void> {
    try {
      await localforage.setItem(key, data);
      console.log(`数据已保存到本地: ${key}`, data);
    } catch (error) {
      console.error(`保存数据失败: ${key}`, error);
      throw error;
    }
  }
}
