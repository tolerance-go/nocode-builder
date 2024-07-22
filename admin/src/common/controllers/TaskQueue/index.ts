export type Task = () => Promise<void>;

export class TaskQueue {
  public onTaskSuccess: () => void = () => {};
  public onTaskFailure: () => void = () => {};
  private queue: Task[] = [];
  private running = false;
  private lastFailedIndex: number | null = null;

  async add(task: Task): Promise<void> {
    this.queue.push(task);
    if (!this.running) {
      this.run();
    }
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
