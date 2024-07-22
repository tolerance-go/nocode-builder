export type Task = () => Promise<void>;

export class TaskQueue {
  public onTaskSuccess: () => void = () => {};
  public onTaskFailure: () => void = () => {};
  private queue: Task[] = [];
  private running = false;

  async add(task: Task): Promise<void> {
    this.queue.push(task);
    if (!this.running) {
      this.run();
    }
  }

  private async run(): Promise<void> {
    this.running = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
          // 在这里通知任务成功
          this.onTaskSuccess();
        } catch (error) {
          // 在这里通知任务失败
          this.onTaskFailure();
        }
      }
    }
    this.running = false;
    // 检查队列中是否有新添加的任务
    if (this.queue.length > 0) {
      this.run();
    }
  }
}
