import { Manager } from '@/types';
import { reduxStore } from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';

export class UIStoreManager implements Manager {
  work() {
    projectTreeOnWork(reduxStore);
  }
}

export * from './store';
export * from './hooks';
