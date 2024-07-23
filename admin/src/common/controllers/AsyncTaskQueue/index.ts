/**
 * 任务队列类
 *
 * 是什么: 一个用于管理异步任务队列的类
 *
 * 为了什么用户: 需要管理异步任务执行顺序并在任务成功或失败时执行相应回调的开发者
 *
 * 解决什么问题: 该类确保异步任务按顺序执行，并在每个任务执行成功或失败后触发相应的回调
 *
 * 以便于: 开发者能够更轻松地管理异步任务的顺序和状态处理
 *
 * 用法示例:
 * const taskQueue = new TaskQueue();
 * taskQueue.onTaskSuccess = () => { console.log('任务成功'); };
 * taskQueue.onTaskFailure = () => { console.log('任务失败'); };
 * taskQueue.add(async () => { \/* 异步任务逻辑 *\/ });
 */

export type AsyncTask = () => Promise<void>;

export class AsyncTaskQueue {
  public onTaskSuccess: () => void = () => {};
  public onTaskFailure: () => void = () => {};
  private queue: AsyncTask[] = [];
  private running = false;
  private lastFailedIndex: number | null = null;

  async add(task: AsyncTask): Promise<void> {
    this.queue.push(task);
    if (!this.running) {
      this.run();
    }
  }

  // 增加 isIdle 方法
  public isIdle(): boolean {
    return !this.running && this.queue.length === 0;
  }
  private async run(): Promise<void> {
    this.running = true;
    while (this.queue.length > 0) {
      const startIndex =
        this.lastFailedIndex !== null ? this.lastFailedIndex : 0;
      this.lastFailedIndex = null; // 重置失败位置
      for (let i = startIndex; i < this.queue.length; i++) {
        const task = this.queue[i];
        try {
          await task();
          // 在这里通知任务成功
          this.onTaskSuccess();
        } catch (error) {
          // 在这里通知任务失败
          this.onTaskFailure();
          // 记录失败位置并停止执行
          this.lastFailedIndex = i;
          this.running = false;
          return;
        }
      }
      // 清空已完成的任务
      this.queue = [];
    }
    this.running = false;
  }
}
