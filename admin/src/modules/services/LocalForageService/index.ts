import { EngineBase, ModuleBase } from '@/base';
import localforage from 'localforage';

export class LocalForageService extends ModuleBase {
  private store: LocalForage;

  constructor(engine: EngineBase) {
    super(engine);
    this.store = localforage.createInstance({
      name: 'nocode-builder-app',
      version: 1.0,
      storeName: 'keyvaluepairs',
      description: 'Local storage for application',
    });
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await this.store.setItem(key, value);
    } catch (error) {
      console.error(`同步数据到 localforage 出错: ${key}`, error);
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await this.store.getItem<T>(key);
      return value;
    } catch (error) {
      console.error(`从 localforage 获取数据出错: ${key}`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.store.removeItem(key);
      console.log(`数据已从 localforage 删除: ${key}`);
    } catch (error) {
      console.error(`从 localforage 删除数据出错: ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.store.clear();
      console.log('localforage 中的所有数据已清除');
    } catch (error) {
      console.error('清除 localforage 中的所有数据出错', error);
    }
  }

  async loadAllItems(): Promise<Record<string, unknown>> {
    const items: Record<string, unknown> = {};
    try {
      await this.store.iterate((value, key) => {
        items[key] = value;
      });
    } catch (error) {
      console.error('从 localforage 加载所有数据出错', error);
    }
    return items;
  }
}
