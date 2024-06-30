import { StoreStatesSlice } from '@/types';
import { OptionalKeys } from '@/utils';
import Dexie, { Table } from 'dexie';

export class StoreDatabase extends Dexie {
  stores: Table<StoreStatesSlice, number, OptionalKeys<StoreStatesSlice, 'id'>>;

  currentVersion: number = 0;

  constructor() {
    super('storeDatabase');
    this.version(1).stores({
      stores: '++id, version, data',
    });

    this.stores = this.table('stores');
  }
}

export const storeDb = new StoreDatabase();
