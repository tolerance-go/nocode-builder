import { api } from '@/globals';
import { Manager } from '@/types';
import store from 'store2';
import {
  AppMiddleware,
  createReducers,
  createSlices,
  createStore,
  findNode,
} from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';
import { 全局事件系统 } from '@/core/systems/全局事件系统';

export class UIStoreManager implements Manager {
  public store;

  public slices;

  public 全局事件系统实例;

  constructor(全局事件系统实例: 全局事件系统) {
    this.全局事件系统实例 = 全局事件系统实例;

    this.slices = createSlices();

    const reducers = createReducers(this.slices);

    this.store = createStore(reducers, [this.handleMiddleware]);

    this.全局事件系统实例.on('项目树历史记录管理者/指针移动', (event) => {
      this.store.dispatch(
        this.slices.projectTree.actions.更新项目节点树(
          event.历史指针 === -1 ? [] : event.历史堆栈[event.历史指针].state,
        ),
      );
    });
  }

  handleMiddleware: AppMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const nextState = store.getState();

    if (action.type === 'projectTree/完成插入新节点并更新相关数据') {
      const { nodeKey } = action.payload;

      const nodeData = nextState.projectTree.项目树节点数据[nodeKey];
      const parentKey =
        nextState.projectTree.derived_节点到父节点的映射[nodeKey];
      const treeSnapshot = nextState.projectTree.项目结构树;

      let index = -1;

      if (parentKey) {
        const parentNode = findNode(
          nextState.projectTree.项目结构树,
          parentKey,
        );
        if (!parentNode?.children) {
          throw new Error('children 非法');
        }
        index = parentNode.children.findIndex((child) => child.key === nodeKey);
      } else {
        index = nextState.projectTree.项目结构树.findIndex(
          (child) => child.key === nodeKey,
        );
      }

      if (index < 0) {
        throw new Error('位置非法');
      }

      this.全局事件系统实例.emit('界面状态管理者/插入新节点', {
        nodeKey: action.payload.nodeKey,
        nodeData,
        parentKey,
        treeNodes: treeSnapshot,
        treeDataRecord: nextState.projectTree.项目树节点数据,
        index,
      });
    }

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
export * from './types';
