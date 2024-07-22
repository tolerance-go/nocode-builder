import localforage from 'localforage';
import { cloneDeep } from 'lodash-es';
import { vi } from 'vitest';

export let mockLocalData: Record<string, unknown | null> = {};

export function mockLocalforage() {
  vi.spyOn(localforage, 'setItem').mockImplementation(async (k, newData) => {
    mockLocalData[k] = newData;
  });

  vi.spyOn(localforage, 'getItem').mockImplementation(async (k) => {
    return mockLocalData[k] ? cloneDeep(mockLocalData[k]) : null;
  });

  vi.spyOn(localforage, 'removeItem').mockImplementation(async (k) => {
    mockLocalData[k] = null;
  });

  vi.spyOn(localforage, 'clear').mockImplementation(async () => {
    mockLocalData = {};
  });
}

export function clearMockLocalforageData() {
  mockLocalData = {};
}
