import { api } from '@/globals';
import { Manager } from '@/types';
import store from 'store2';
import {
  AppMiddleware,
  createReducers,
  createSlices,
  createStore,
} from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';

export class UIStoreManager implements Manager {
  public store;

  public slices;

  constructor() {
    this.slices = createSlices();

    const reducers = createReducers(this.slices);

    this.store = createStore(reducers, [this.loggerMiddleware]);
  }

  loggerMiddleware: AppMiddleware = () => (next) => (action) => {
    if (
      action.type === 'projectTree/插入新节点在指定节点下并同步更新其他数据'
    ) {
      action.payload;
    }

    const result = next(action);
    return result;
  };

  async work() {
    projectTreeOnWork(this.store, this.slices);

    let prevState = this.store.getState();
    this.store.subscribe(() => {
      const nextState = this.store.getState();
      if (nextState.userInfo.token !== prevState.userInfo.token) {
        this.请求同步用户信息();
      }
      prevState = nextState;
    });

    this.检查本地用户token同步到内存中();
  }

  async 请求同步用户信息() {
    const userInfo = await api.users.getUserByToken();
    this.store.dispatch(this.slices.userInfo.actions.更新用户名(userInfo.name));
  }

  检查本地用户token同步到内存中() {
    const token = store.get('token');
    if (token) {
      this.store.dispatch(this.slices.userInfo.actions.更新token(token));
    }
  }
}

export * from './hooks';
export * from './store';
export * from './utils';
