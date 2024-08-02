import { ProjectTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { pathItems } from '@/common/constants';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { 用户表模块 } from '../models/用户表模块';
import { 事件中心系统 } from '../事件中心系统';
import { 本地数据管理模块 } from '../本地数据管理模块';
import { 界面导航系统 } from '../界面导航系统';
import { localStateFieldName } from './constants';
import {
  createLayoutInitialState,
  createLayoutSlice,
  createLocationInitialState,
  createLocationSlice,
  createProjectTreeAsyncActions,
  createProjectTreeInitialState,
  createProjectTreeSlice,
  createUserInfoInitialState,
  createUserInfoSlice,
  createWidgetTreeInitialState,
  createWidgetTreeSlice,
} from './states';
import { AppMiddleware, AppSlices, RootState } from './types';
import { findNode, generateProjectTreeMeta } from './utils';
import { 项目组表模块 } from '../models/项目组表模块';
import { 项目表模块 } from '../models/项目表模块';

export class 界面状态仓库模块 extends ModuleBase {
  static createAsyncActions = (slices: AppSlices) => {
    const projectSlice = createProjectTreeAsyncActions(slices);
    const actions = {
      [slices.projectTree.name]: projectSlice,
    };
    return actions;
  };

  static createSlices = () => {
    const projectSlice = createProjectTreeSlice();
    const layoutSlice = createLayoutSlice();
    const locationSlice = createLocationSlice();
    const userInfoSlice = createUserInfoSlice();
    const widgetTreeSlice = createWidgetTreeSlice();
    const slices = {
      [projectSlice.name]: projectSlice,
      [layoutSlice.name]: layoutSlice,
      [locationSlice.name]: locationSlice,
      [userInfoSlice.name]: userInfoSlice,
      [widgetTreeSlice.name]: widgetTreeSlice,
    };
    return slices;
  };

  static createReducers = <
    T extends ReturnType<typeof 界面状态仓库模块.createSlices>,
  >(
    slices: T,
  ) => {
    const reducers = {
      projectTree: slices.projectTree.reducer,
      layout: slices.layout.reducer,
      location: slices.location.reducer,
      userInfo: slices.userInfo.reducer,
      widgetTree: slices.widgetTree.reducer,
    };

    return reducers;
  };

  static createStore = <
    T extends ReturnType<typeof 界面状态仓库模块.createReducers>,
  >(
    reducer: T,
    middlewares: AppMiddleware[] = [],
    preloadedState: object | null = null,
  ) =>
    configureStore({
      reducer,
      preloadedState: preloadedState ?? undefined,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares as Middleware[]),
    });

  private static instance: 界面状态仓库模块;

  public static getInstance(engine: EngineBase): 界面状态仓库模块 {
    if (!界面状态仓库模块.instance) {
      界面状态仓库模块.instance = new 界面状态仓库模块(engine);
    }

    return 界面状态仓库模块.instance;
  }

  slices;
  reducers;
  store;
  asyncActions;

  public handleMiddleware: AppMiddleware = (store) => (next) => (action) => {
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

      this.getDependModule(事件中心系统).emit('界面状态管理者/新增节点', {
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
      this.getDependModule(事件中心系统).emit('界面状态管理者/修改节点', {
        nodeKey: action.payload.nodeKey,
        newTreeNodeData: newNodeData,
        oldTreeNodeData: oldNodeData,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/删除节点') {
      this.getDependModule(事件中心系统).emit('界面状态管理者/删除节点', {
        nodeKeys: action.payload,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/移动节点') {
      this.getDependModule(事件中心系统).emit('界面状态管理者/移动节点', {
        节点keys: action.payload.nodeKeys,
        目标父节点key: action.payload.newParentKey,
        index: action.payload.newIndex,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    }

    return result;
  };

  private initialState?: RootState;

  constructor(engine: EngineBase) {
    super(engine);

    let initialState =
      this.getDependModule(本地数据管理模块).get<RootState>(
        localStateFieldName,
      );

    // 从数据库同步状态
    if (this.getDependModule(用户表模块).currentLoginUser) {
      if (!initialState) {
        const projectRecords =
          this.getDependModule(项目表模块).table.getAllRecords();
        const projectGroupRecords =
          this.getDependModule(项目组表模块).table.getAllRecords();

        const { 项目树节点数据, 项目结构树, derived_节点到父节点的映射 } =
          generateProjectTreeMeta(projectRecords, projectGroupRecords);

        initialState = {
          userInfo: createUserInfoInitialState(),
          location: createLocationInitialState(),
          layout: createLayoutInitialState(),
          widgetTree: createWidgetTreeInitialState(),
          projectTree: {
            ...createProjectTreeInitialState(),
            项目树节点数据,
            项目结构树,
            derived_节点到父节点的映射,
          },
        };
      }
    }

    this.initialState = initialState;

    this.slices = 界面状态仓库模块.createSlices();
    this.asyncActions = 界面状态仓库模块.createAsyncActions(this.slices);

    this.reducers = 界面状态仓库模块.createReducers(this.slices);

    this.store = 界面状态仓库模块.createStore(
      this.reducers,
      [this.handleMiddleware],
      initialState,
    );

    this.注册用户信息监听();
    this.监听项目节点激活状态变化并修改url();
    this.注册监听保存状态到本地();
    this.注册路由更新监听();
    this.注册指针移动监听();
  }

  注册指针移动监听() {
    this.getDependModule(事件中心系统).on(
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
        this.getDependModule(事件中心系统).emit('界面状态管理者/路由更新', {
          pathname: nextState.location.pathname,
        });
      }
      prevState = nextState;
    });
  }

  注册用户信息监听() {
    const userInfo = this.getDependModule(用户表模块).currentLoginUser;

    if (userInfo) {
      this.store.dispatch(
        this.slices.userInfo.actions.更新用户信息({
          username: userInfo.name,
          isAdmin: userInfo.isAdmin,
        }),
      );
    }

    this.getDependModule(事件中心系统).on(
      '用户模型表/获取登录用户信息成功',
      ({ userInfo }) => {
        this.store.dispatch(
          this.slices.userInfo.actions.更新用户信息({
            username: userInfo.name,
            isAdmin: userInfo.isAdmin,
          }),
        );
      },
    );
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
            if (nodeData.projectType === ProjectTypeEnum.View) {
              this.getDependModule(界面导航系统).navigateTo(
                pathItems['view-editor'],
              );
            } else if (nodeData.projectType === ProjectTypeEnum.Bluemap) {
              this.getDependModule(界面导航系统).navigateTo(
                pathItems['bluemap-editor'],
              );
            } else if (nodeData.projectType === ProjectTypeEnum.DataTable) {
              this.getDependModule(界面导航系统).navigateTo(
                pathItems['data-table-editor'],
              );
            }
          }
        }
      }

      previousState = currentState; // 更新之前的 state
    });
  }

  注册监听保存状态到本地() {
    const { store } = this;
    store.subscribe(() => {
      const state = store.getState();
      const next = this.过滤掉某些不存储到本地的state(state);
      this.getDependModule(本地数据管理模块).set(localStateFieldName, next);
    });
  }

  protected requireModules(): void {
    super.requireModules(
      本地数据管理模块.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
      项目组表模块.getInstance(this.engine),
      项目表模块.getInstance(this.engine),
      事件中心系统.getInstance(this.engine),
      界面导航系统.getInstance(this.engine),
    );
  }

  protected async onSetup(): Promise<void> {}

  private 过滤掉某些不存储到本地的state(state: RootState): RootState {
    return produce(state, (draft) => {
      draft.location.pathname = null;
    });
  }
}

export * from './constants';
export * from './hooks';
export * from './types';
export * from './utils';
