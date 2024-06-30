export class UndoRedoManager<T> {
  private historyStack: T[];
  private currentIndex: number;

  constructor(initialState: T) {
    this.historyStack = [initialState];
    this.currentIndex = 0;
  }

  // 执行一个新操作
  execute(newState: T): void {
    // 截断操作栈，删除当前指针之后的所有操作记录
    if (this.currentIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
    }

    // 将新状态添加到操作栈
    this.historyStack.push(newState);
    this.currentIndex++;
  }

  // Undo 操作
  undo(): T {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      console.log('无法再进行 Undo 操作');
    }
    return this.historyStack[this.currentIndex];
  }

  // Redo 操作
  redo(): T {
    if (this.currentIndex < this.historyStack.length - 1) {
      this.currentIndex++;
    } else {
      console.log('无法再进行 Redo 操作');
    }
    return this.historyStack[this.currentIndex];
  }

  // 获取当前状态
  getCurrentState(): T {
    return this.historyStack[this.currentIndex];
  }
}
