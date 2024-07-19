import localforage from 'localforage';

type SaveTask = {
  key: string;
  value: unknown;
  resolve: () => void;
  reject: (reason?: unknown) => void;
};

export class LocalState {
  private store = localforage.createInstance({
    name: 'engineLocalState',
  });

  private cache: Map<string, unknown> = new Map();
  private saveQueue: SaveTask[] = [];
  private isSaving = false;

  public async load() {
    const keys = await this.store.keys();
    const promises = keys.map(async (key) => {
      const value = await this.store.getItem(key);
      this.cache.set(key, value);
    });
    await Promise.all(promises);
  }

  public set(key: string, value: unknown) {
    this.cache.set(key, value);
    this.enqueueSaveState(key, value);
  }

  private enqueueSaveState(key: string, value: unknown) {
    new Promise<void>((resolve, reject) => {
      this.saveQueue.push({ key, value, resolve, reject });
      if (!this.isSaving) {
        this.processSaveQueue();
      }
    });
  }

  private async processSaveQueue() {
    this.isSaving = true;
    while (this.saveQueue.length > 0) {
      const { key, value, resolve, reject } = this.saveQueue.shift()!;
      try {
        await this.store.setItem(key, value);
        resolve();
      } catch (error) {
        reject(error);
      }
    }
    this.isSaving = false;
  }

  public get(key: string): unknown {
    return this.cache.get(key);
  }
}
