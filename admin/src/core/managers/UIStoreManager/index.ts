import { Manager } from '@/types';
import { createReducers, createSlices, createStore } from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';

export class UIStoreManager implements Manager {
  public store;

  public slices;

  constructor() {
    this.slices = createSlices();

    const reducers = createReducers(this.slices);

    this.store = createStore(reducers);
  }

  async work() {
    projectTreeOnWork(this.store, this.slices);
  }
}

export * from './hooks';
export * from './store';
export * from './utils';
