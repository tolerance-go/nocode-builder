// storage.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import localforage from 'localforage';
import { setItem, getItem, removeItem } from './storage';

interface StorageObject {
  [key: string]: unknown;
}

// 内存中的存储对象
const storage: StorageObject = {};

// 模拟 localforage 的 API
vi.mock('localforage', () => ({
  default: {
    setItem: vi.fn((key: string, value: unknown) => {
      storage[key] = value;
      return Promise.resolve(value);
    }),
    getItem: vi.fn((key: string) => {
      return Promise.resolve(storage[key]);
    }),
    removeItem: vi.fn((key: string) => {
      storage[key] = null;
      return Promise.resolve();
    }),
    clear: vi.fn(() => {
      Object.keys(storage).forEach((key) => (storage[key] = null));
      return Promise.resolve();
    }),
  },
}));

describe('LocalForage Storage', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // 清除所有模拟调用数据
    Object.keys(storage).forEach((key) => delete storage[key]); // 清空内存中的存储对象
  });

  it('should set and get an item', async () => {
    const key = 'key1';
    const value = 'value1';

    await setItem(key, value);
    const result = await getItem<string>(key);
    expect(result).toBe(value);

    // 确认 setItem 和 getItem 被调用了一次
    expect(localforage.setItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledTimes(1);

    // 确认调用时传递的参数正确
    expect(localforage.setItem).toHaveBeenCalledWith(key, value);
    expect(localforage.getItem).toHaveBeenCalledWith(key);
  });

  it('should remove an item', async () => {
    const key = 'key2';
    const value = 'value2';

    await setItem(key, value);
    const setResult = await getItem<string>(key); // 第一次调用 getItem 来验证设置成功
    expect(setResult).toBe(value); // 验证存储项是否设置成功

    await removeItem(key);
    const removeResult = await getItem<string>(key); // 第二次调用 getItem 来验证删除成功
    expect(removeResult).toBeNull();

    // 确认 removeItem 被调用了一次
    expect(localforage.removeItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledTimes(2); // 被调用两次：设置后验证一次，删除后验证一次

    // 确认调用时传递的参数正确
    expect(localforage.removeItem).toHaveBeenCalledWith(key);
    expect(localforage.getItem).toHaveBeenCalledWith(key);
  });
});
