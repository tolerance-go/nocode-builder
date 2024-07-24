import { EngineBase, ModuleBase } from '@/base';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { AppMiddleware, findNode, RootState } from '../界面状态管理器模块';
import { LayoutStateController } from './controllers';
import {
  createProjectTreeSlice,
  createLayoutSlice,
  createLocationSlice,
  createUserInfoSlice,
} from '../界面状态管理器模块/states';
import { 全局事件系统 } from '../全局事件系统';

export class 界面状态仓库模块 extends ModuleBase {
  static createSlices = () => {
    const projectSlice = createProjectTreeSlice();
    const layoutSlice = createLayoutSlice();
    const locationSlice = createLocationSlice();
    const userInfoSlice = createUserInfoSlice();
    const slices = {
      [projectSlice.name]: projectSlice,
      [layoutSlice.name]: layoutSlice,
      [locationSlice.name]: locationSlice,
      [userInfoSlice.name]: userInfoSlice,
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

  slices;
  reducers;
  store;

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

      this.getDependModule(全局事件系统).emit('界面状态管理者/新增节点', {
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
      this.getDependModule(全局事件系统).emit('界面状态管理者/修改节点', {
        nodeKey: action.payload.nodeKey,
        newTreeNodeData: newNodeData,
        oldTreeNodeData: oldNodeData,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/删除节点') {
      this.getDependModule(全局事件系统).emit('界面状态管理者/删除节点', {
        nodeKeys: action.payload,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    } else if (action.type === 'projectTree/移动节点') {
      this.getDependModule(全局事件系统).emit('界面状态管理者/移动节点', {
        节点keys: action.payload.nodeKeys,
        目标父节点key: action.payload.newParentKey,
        index: action.payload.newIndex,
        treeNodes: nextState.projectTree.项目结构树,
        treeDataRecord: nextState.projectTree.项目树节点数据,
      });
    }

    return result;
  };

  private layoutStateController: LayoutStateController;

  constructor(engine: EngineBase, initialState?: RootState) {
    super(engine);

    this.slices = 界面状态仓库模块.createSlices();

    this.reducers = 界面状态仓库模块.createReducers(this.slices);

    this.store = 界面状态仓库模块.createStore(
      this.reducers,
      [this.handleMiddleware],
      initialState,
    );

    this.layoutStateController = new LayoutStateController();
  }

  protected requireModules(): void {
    super.requireModules(this.engine.getModuleOrCreate(全局事件系统));
  }

  protected async onSetup(): Promise<void> {
    await this.layoutStateController.onCreateStore(this.store, this.slices);
  }
}
