// storage.ts
import localforage from 'localforage';

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  await localforage.setItem(key, value);
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  return await localforage.getItem<T>(key);
};

export const removeItem = async (key: string): Promise<void> => {
  await localforage.removeItem(key);
};
