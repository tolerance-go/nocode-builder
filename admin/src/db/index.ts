import { StoreStatesSlice } from '@/types';
import { OptionalKeys } from '@/utils';
import Dexie, { Table } from 'dexie';

export class StoreDatabase extends Dexie {
  stores: Table<StoreStatesSlice, number, OptionalKeys<StoreStatesSlice, 'id'>>;

  constructor() {
    super('storeDatabase');
    this.version(1).stores({
      stores: '++id, data',
    });

    this.stores = this.table('stores');
  }
}

export const storeDb = new StoreDatabase();
