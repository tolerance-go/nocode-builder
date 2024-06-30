import { storeDb } from '@/db';
import { Store } from '@/types';
import { StateCreator, StoreMutatorIdentifier } from 'zustand';

type StoreSlice = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type StoreSliceImpl = <T extends Store>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

function filterNonFunctionFields<T extends object>(
  obj: T,
): {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : T[K];
} {
  const result = {} as {
    [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : T[K];
  };
  for (const key in obj) {
    if (typeof obj[key] !== 'function') {
      result[key] = obj[key] as T[typeof key] extends (
        ...args: unknown[]
      ) => unknown
        ? never
        : T[typeof key];
    }
  }
  return result;
}

const storeSliceImpl: StoreSliceImpl = (f) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    // const prevState = get();
    set(...args);
    const nextState = get();

    storeDb.stores.add({
      data: filterNonFunctionFields(nextState),
    });
  };

  const setState = store.setState;
  store.setState = (...args) => {
    // const prevState = get();
    setState(...args);
    const nextState = get();
    storeDb.stores.add({
      data: filterNonFunctionFields(nextState),
    });
  };

  return f(loggedSet, get, store);
};

export const storeSliceMiddleware = storeSliceImpl as StoreSlice;
