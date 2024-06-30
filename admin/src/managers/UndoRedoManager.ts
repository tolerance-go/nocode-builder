import localforage from 'localforage';

export class UndoRedoManager<T> {
  private static instance: UndoRedoManager<unknown> | null = null;
  private historyStack: T[];
  private currentIndex: number;
  private storageKey: string = 'undoRedoHistory';
  private loadingHistory: boolean;
  private savingHistory: boolean;
  private pendingOperations: (() => void)[];
  private pendingSaves: (() => void)[];

  private constructor(private storage: typeof localforage = localforage) {
    this.historyStack = [];
    this.currentIndex = -1;
    this.loadingHistory = true;
    this.savingHistory = false;
    this.pendingOperations = [];
    this.pendingSaves = [];
    this.loadHistory();
  }

  // 获取单例实例的方法
  public static getInstance<T>(
    storage?: typeof localforage,
  ): UndoRedoManager<T> {
    if (!UndoRedoManager.instance) {
      UndoRedoManager.instance = new UndoRedoManager(storage);
    }
    return UndoRedoManager.instance as UndoRedoManager<T>;
  }

  // 创建单例实例并提前准备数据的方法
  public static async initialize<T>(
    storage?: typeof localforage,
  ): Promise<UndoRedoManager<T>> {
    return this.getInstance<T>(storage);
  }

  // 销毁单例实例的方法
  public static destroyInstance(): void {
    if (UndoRedoManager.instance) {
      UndoRedoManager.instance = null;
    }
  }

  // 执行一个新操作
  async execute(newState: T): Promise<void> {
    if (this.loadingHistory) {
      this.pendingOperations.push(() => this.execute(newState));
      return;
    }

    // 截断操作栈，删除当前指针之后的所有操作记录
    if (this.currentIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
    }

    // 将新状态添加到操作栈
    this.historyStack.push(newState);
    this.currentIndex++;
    await this.saveHistory();
  }

  // Undo 操作
  async undo(): Promise<T | undefined> {
    if (this.loadingHistory) {
      this.pendingOperations.push(() => this.undo());
      return;
    }

    if (this.currentIndex > 0) {
      this.currentIndex--;
      await this.saveHistory();
    } else {
      console.log('无法再进行 Undo 操作');
    }
    return this.historyStack[this.currentIndex];
  }

  // Redo 操作
  async redo(): Promise<T | undefined> {
    if (this.loadingHistory) {
      this.pendingOperations.push(() => this.redo());
      return;
    }

    if (this.currentIndex < this.historyStack.length - 1) {
      this.currentIndex++;
      await this.saveHistory();
    } else {
      console.log('无法再进行 Redo 操作');
    }
    return this.historyStack[this.currentIndex];
  }

  // 获取当前状态
  getCurrentState(): T | undefined {
    return this.historyStack[this.currentIndex];
  }

  // 保存历史记录到 LocalForage
  public async saveHistory(): Promise<void> {
    if (this.savingHistory) {
      this.pendingSaves.push(() => this.saveHistory());
      return;
    }

    this.savingHistory = true;
    try {
      await this.storage.setItem(this.storageKey, {
        historyStack: this.historyStack,
        currentIndex: this.currentIndex,
      });
    } catch (error) {
      console.error('保存历史记录失败', error);
    } finally {
      this.savingHistory = false;
      this.executePendingSaves();
    }
  }

  // 执行在保存历史期间存储的保存操作
  public async executePendingSaves(): Promise<void> {
    while (this.pendingSaves.length > 0) {
      const saveOperation = this.pendingSaves.shift();
      if (saveOperation) {
        await saveOperation();
      }
    }
  }

  // 从 LocalForage 加载历史记录
  public async loadHistory(): Promise<void> {
    try {
      const savedData = await this.storage.getItem<{
        historyStack: T[];
        currentIndex: number;
      }>(this.storageKey);
      if (savedData) {
        this.historyStack = savedData.historyStack;
        this.currentIndex = savedData.currentIndex;
      }
    } catch (error) {
      console.error('加载历史记录失败', error);
    } finally {
      this.loadingHistory = false;
      this.executePendingOperations();
    }
  }

  // 执行在加载历史期间存储的操作
  public executePendingOperations(): void {
    this.pendingOperations.forEach((operation) => operation());
    this.pendingOperations = [];
  }
}
