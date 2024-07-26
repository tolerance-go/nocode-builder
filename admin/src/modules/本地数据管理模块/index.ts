import { EngineBase, ModuleBase } from '@/base';
import { LocalForageService } from '../services/LocalForageService';

export class 本地数据管理模块 extends ModuleBase {
  private static instance: 本地数据管理模块;

  public static getInstance(engine: EngineBase): 本地数据管理模块 {
    if (!本地数据管理模块.instance) {
      本地数据管理模块.instance = new 本地数据管理模块(engine);
    }

    return 本地数据管理模块.instance;
  }

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
    this.addTaskToQueue(() => this.syncToLocalForage(key, value));
  }

  // 同步获取本地状态中的数据
  get<T>(key: string): T | undefined {
    const data = this.localData[key];
    return data as T | undefined;
  }

  // 从本地状态中删除数据
  remove(key: string): void {
    delete this.localData[key];
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
    } catch (error) {
      console.error(`同步数据到 localforage 出错: ${key}`, error);
    }
  }

  // 从 localforage 中删除数据
  private async removeFromLocalForage(key: string): Promise<void> {
    try {
      await this.getDependModule(LocalForageService).removeItem(key);
    } catch (error) {
      console.error(`从 localforage 删除数据出错: ${key}`, error);
    }
  }
}
