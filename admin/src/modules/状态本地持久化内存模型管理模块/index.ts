import { EngineBase, ModuleBase } from '@/base';
import { LocalForageService } from '../services/LocalForageService';

export class 状态本地持久化内存模型管理模块 extends ModuleBase {
  private localData: Record<string, unknown>;
  private taskQueue: Promise<void>;

  constructor(engine: EngineBase) {
    super(engine);
    this.localData = {};
    this.taskQueue = Promise.resolve();
  }

  // 同步设置数据到本地状态
  set<T>(key: string, value: T): void {
    this.localData[key] = value;
    console.log(`数据已设置: ${key}`, value);
    this.addTaskToQueue(() => this.syncToLocalForage(key, value));
  }

  // 同步获取本地状态中的数据
  get<T>(key: string): T | undefined {
    const data = this.localData[key];
    console.log(`获取数据: ${key}`, data);
    return data as T | undefined;
  }

  // 从本地状态中删除数据
  remove(key: string): void {
    delete this.localData[key];
    console.log(`数据已删除: ${key}`);
    this.addTaskToQueue(() => this.removeFromLocalForage(key));
  }

  protected requireModules(): void {
    super.requireModules(new LocalForageService(this.engine));
  }

  protected async onSetup(): Promise<void> {
    this.localData =
      await this.getDependModule(LocalForageService).loadAllItems();
  }

  // 添加任务到异步队列
  private addTaskToQueue(task: () => Promise<void>): void {
    this.taskQueue = this.taskQueue.then(task).catch((error) => {
      console.error('队列任务执行出错', error);
    });
  }

  // 同步设置数据到 localforage
  private async syncToLocalForage<T>(key: string, value: T): Promise<void> {
    try {
      await this.getDependModule(LocalForageService).setItem(key, value);
      console.log(`数据已同步到 localforage: ${key}`, value);
    } catch (error) {
      console.error(`同步数据到 localforage 出错: ${key}`, error);
    }
  }

  // 从 localforage 中删除数据
  private async removeFromLocalForage(key: string): Promise<void> {
    try {
      await this.getDependModule(LocalForageService).removeItem(key);
      console.log(`数据已从 localforage 删除: ${key}`);
    } catch (error) {
      console.error(`从 localforage 删除数据出错: ${key}`, error);
    }
  }
}
