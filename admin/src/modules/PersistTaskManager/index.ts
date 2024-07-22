import { ModuleBase } from '@/base';

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
export class PersistTaskManager extends ModuleBase {
  private persistTasks: PersistTask<unknown>[] = []; // 内部任务队列

  constructor() {
    super();
  }

  // 添加一个持久化任务到队列
  addPersistTask<T>(task: PersistTask<T>): void {
    this.persistTasks.push(task);
  }

  // 获取下一个持久化任务
  getNextTask(): PersistTask<unknown> | undefined {
    return this.persistTasks.shift();
  }

  // 检查任务队列是否为空
  isQueueEmpty(): boolean {
    return this.persistTasks.length === 0;
  }

  protected async onSetup(): Promise<void> {
    console.log('持久化任务管理器模块 setup 完成');
  }

  protected async onStart(): Promise<void> {
    console.log('持久化任务管理器模块 start 完成');
  }
}
