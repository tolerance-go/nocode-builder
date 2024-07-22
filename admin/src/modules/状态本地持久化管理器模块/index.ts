import { ModuleBase } from '@/base';
import { TaskQueue } from '@/common/controllers/TaskQueue';
import localforage from 'localforage';

export class 状态本地持久化管理器模块 extends ModuleBase {
  private taskQueue: TaskQueue;

  constructor() {
    super();
    this.taskQueue = new TaskQueue();
    this.taskQueue.onTaskSuccess = this.onTaskSuccess.bind(this);
    this.taskQueue.onTaskFailure = this.onTaskFailure.bind(this);
  }

  // 示例持久化任务
  async persistData<T>(key: string, data: T): Promise<void> {
    await this.addTask(async () => {
      // 这里是具体的持久化逻辑
      await this.saveDataLocally(key, data);
    });
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

  // 异步添加任务到队列
  private async addTask(task: () => Promise<void>): Promise<void> {
    await this.taskQueue.add(task);
  }

  // 任务成功的回调
  private onTaskSuccess() {
    console.log('任务成功执行');
  }

  // 任务失败的回调
  private onTaskFailure() {
    console.log('任务执行失败');
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
