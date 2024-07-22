import localforage from 'localforage';
import { cloneDeep } from 'lodash-es';
import { vi } from 'vitest';

let localData: Record<string, unknown | null> = {};

export function mockLocalforage() {
  vi.spyOn(localforage, 'setItem').mockImplementation(async (k, newData) => {
    localData[k] = newData;
  });

  vi.spyOn(localforage, 'getItem').mockImplementation(async (k) => {
    return localData[k] ? cloneDeep(localData[k]) : null;
  });

  vi.spyOn(localforage, 'removeItem').mockImplementation(async (k) => {
    localData[k] = null;
  });

  vi.spyOn(localforage, 'clear').mockImplementation(async () => {
    localData = {};
  });
}

export function clearMockLocalforageData() {
  localData = {};
}
