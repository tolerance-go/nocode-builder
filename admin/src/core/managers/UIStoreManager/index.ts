import { ProjectTypeEnum } from '@/_gen/models';
import { paths } from '@/configs';
import { ManagerBase } from '@/core/base';
import { 界面导航系统 } from '@/core/systems';
import { 全局事件系统 } from '@/core/systems/全局事件系统';
import { api } from '@/globals';
import { produce } from 'immer';
import localforage from 'localforage';
import store from 'store2';
import { localStateFieldName } from './configs';
import {
  AppMiddleware,
  createReducers,
  createSlices,
  createStore,
  findNode,
  RootState,
} from './store';
import { onWork as projectTreeOnWork } from './store/slices/projectTree/onWork';

export class UIStoreManager extends ManagerBase {
  public store;

  public slices;

  private initialState: RootState | null;

  constructor(localState: RootState | null) {
    super();

    this.slices = createSlices();

    const reducers = createReducers(this.slices);

    this.initialState = localState;

    this.store = createStore(
      reducers,
      [this.handleMiddleware],
      this.initialState,
    );
  }

  requires(
    全局事件系统实例: 全局事件系统,
    界面导航系统实例: 界面导航系统,
  ): this {
    return super.requires(全局事件系统实例, 界面导航系统实例);
  }

  protected async onSetup(): Promise<void> {
    projectTreeOnWork(this.store, this.slices);

    this.监听项目节点激活状态变化并修改url();
    this.注册监听保存状态到本地();
    this.注册同步用户信息监听();
    this.检查本地用户token同步到内存中();
    this.注册路由更新监听();
    this.注册指针移动监听();
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

      this.requireActor(全局事件系统).emit('界面状态管理者/新增节点', {
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
      this.requireActor(全局事件系统).emit('界面状态管理者/修改节点', {
        nodeKey: action.payload.nodeKey,
        newTreeNodeData: newNodeData,
        oldTreeNodeData: oldNodeData,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/删除节点') {
      this.requireActor(全局事件系统).emit('界面状态管理者/删除节点', {
        nodeKeys: action.payload,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/移动节点') {
      this.requireActor(全局事件系统).emit('界面状态管理者/移动节点', {
        节点keys: action.payload.nodeKeys,
        目标父节点key: action.payload.newParentKey,
        index: action.payload.newIndex,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    }

    return result;
  };

  注册指针移动监听() {
    this.requireActor(全局事件系统).on(
      '项目树历史记录管理者/指针移动',
      (event) => {
        this.store.dispatch(
          this.slices.projectTree.actions.更新项目节点树(
            event.历史指针 === -1
              ? {
                  结构树: this.initialState?.projectTree.项目结构树 ?? [],
                  节点数据: this.initialState?.projectTree.项目树节点数据 ?? {},
                }
              : {
                  结构树: event.历史堆栈[event.历史指针].state.treeNodes,
                  节点数据: event.历史堆栈[event.历史指针].state.treeDataRecord,
                },
          ),
        );
      },
    );
  }

  注册路由更新监听() {
    let prevState = this.store.getState();
    this.store.subscribe(() => {
      const nextState = this.store.getState();
      if (
        nextState.location.pathname !== prevState.location.pathname &&
        nextState.location.pathname
      ) {
        this.requireActor(全局事件系统).emit('界面状态管理者/路由更新', {
          pathname: nextState.location.pathname,
        });
      }
      prevState = nextState;
    });
  }

  注册同步用户信息监听() {
    let prevState = this.store.getState();
    this.store.subscribe(() => {
      const nextState = this.store.getState();
      if (nextState.userInfo.token !== prevState.userInfo.token) {
        this.请求同步用户信息();
      }
      prevState = nextState;
    });
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

  监听项目节点激活状态变化并修改url() {
    let previousState = this.store.getState(); // 初始化之前的 state
    this.store.subscribe(() => {
      const currentState = this.store.getState(); // 获取当前的 state

      if (
        currentState.projectTree.激活的节点的key !==
        previousState.projectTree.激活的节点的key
      ) {
        if (currentState.projectTree.激活的节点的key) {
          const nodeData =
            currentState.projectTree.项目树节点数据[
              currentState.projectTree.激活的节点的key
            ];
          if (nodeData.type === 'file') {
            if (nodeData.projectFileType === ProjectTypeEnum.View) {
              this.requireActor(界面导航系统).navigateTo(paths['view-editor']);
            } else if (nodeData.projectFileType === ProjectTypeEnum.Bluemap) {
              this.requireActor(界面导航系统).navigateTo(
                paths['bluemap-editor'],
              );
            } else if (nodeData.projectFileType === ProjectTypeEnum.DataTable) {
              this.requireActor(界面导航系统).navigateTo(
                paths['data-table-editor'],
              );
            }
          }
        }
      }

      previousState = currentState; // 更新之前的 state
    });
  }

  注册监听保存状态到本地() {
    this.store.subscribe(() => {
      const state = this.store.getState();

      const next = this.过滤掉某些不存储到本地的state(state);

      localforage.setItem(localStateFieldName, next);
    });
  }

  过滤掉某些不存储到本地的state(state: RootState): RootState {
    return produce(state, (draft) => {
      draft.location.pathname = null;
    });
  }
}

export * from './hooks';
export * from './store';
export * from './types';
export * from './utils';
