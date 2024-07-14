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
          event.历史指针 === -1
            ? {
                结构树: [],
                节点数据: {},
              }
            : {
                结构树: event.历史堆栈[event.历史指针].state.treeNodes,
                节点数据: event.历史堆栈[event.历史指针].state.treeDataRecord,
              },
        ),
      );
    });
  }

  handleMiddleware: AppMiddleware = (store) => (next) => (action) => {
    const prevState = store.getState();

    const result = next(action);

    const nextState = store.getState();

    if (action.type === 'projectTree/新增节点') {
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

      this.全局事件系统实例.emit('界面状态管理者/新增节点', {
        nodeKey: action.payload.nodeKey,
        nodeData,
        parentKey,
        treeNodes: treeSnapshot,
        treeDataRecord: nextState.projectTree.项目树节点数据,
        index,
      });
    } else if (action.type === 'projectTree/修改节点') {
      const { nodeKey } = action.payload;
      const newNodeData = nextState.projectTree.项目树节点数据[nodeKey];
      const oldNodeData = prevState.projectTree.项目树节点数据[nodeKey];
      this.全局事件系统实例.emit('界面状态管理者/修改节点', {
        nodeKey: action.payload.nodeKey,
        newTreeNodeData: newNodeData,
        oldTreeNodeData: oldNodeData,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/删除节点') {
      this.全局事件系统实例.emit('界面状态管理者/删除节点', {
        nodeKeys: action.payload,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/移动节点') {
      this.全局事件系统实例.emit('界面状态管理者/移动节点', {
        节点keys: action.payload.nodeKeys,
        目标父节点key: action.payload.newParentKey,
        index: action.payload.newIndex,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
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
