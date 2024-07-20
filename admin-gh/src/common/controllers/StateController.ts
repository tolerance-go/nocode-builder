type Listener<T> = (state: T) => void;

export class StateController<T> {
  private state: T;
  private listeners: Listener<T>[] = [];

  constructor({ initialState }: { initialState: T }) {
    this.state = initialState;
  }

  public updateState(updates: Partial<T>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  public getState(): T {
    return this.state;
  }

  public subscribe(listener: Listener<T>): () => void {
    this.listeners.push(listener);

    // 返回一个函数用于取消订阅
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
