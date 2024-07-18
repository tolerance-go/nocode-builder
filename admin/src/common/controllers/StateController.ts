type SaveTask<T> = {
  state: T;
  resolve: () => void;
  reject: (reason?: unknown) => void;
};

export class StateController<T> {
  private state: T;
  private readonly saveStateFunction: (state: T) => Promise<void>; // 持久化函数
  private readonly loadStateFunction: () => Promise<T | null>; // 加载持久化状态函数
  private saveQueue: SaveTask<T>[] = []; // 保存操作队列
  private isSaving = false; // 标记当前是否在进行保存操作

  constructor({
    initialState,
    saveStateFunction,
    loadStateFunction,
  }: {
    initialState: T;
    saveStateFunction: (state: T) => Promise<void>;
    loadStateFunction: () => Promise<T | null>;
  }) {
    this.state = initialState;
    this.saveStateFunction = saveStateFunction;
    this.loadStateFunction = loadStateFunction;
  }

  public updateState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
    this.enqueueSaveState(); // 使用队列异步保存状态
  }

  private enqueueSaveState(): void {
    new Promise<void>((resolve, reject) => {
      this.saveQueue.push({
        state: this.state,
        resolve,
        reject,
      });

      if (!this.isSaving) {
        this.processSaveQueue();
      }
    });
  }

  private async processSaveQueue(): Promise<void> {
    this.isSaving = true;

    while (this.saveQueue.length > 0) {
      const { state, resolve, reject } = this.saveQueue.shift()!;
      try {
        await this.saveStateFunction(state);
        resolve();
      } catch (error) {
        reject(error);
      }
    }

    this.isSaving = false;
  }

  public async loadState(): Promise<void> {
    const state: T | null = await this.loadStateFunction();
    if (state) {
      this.state = state;
    }
  }

  public getState(): T {
    return this.state;
  }
}
