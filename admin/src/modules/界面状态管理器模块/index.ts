import { ProjectTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { pathItems } from '@/common/constants';
import { 基础引擎 } from '@/engines/基础引擎';
import { produce } from 'immer';
import { 事件中心系统 } from '../事件中心系统';
import { 界面导航系统 } from '../界面导航系统';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import { localStateFieldName } from './constants';
import { RootState } from './types';

export class UIStoreManager extends ModuleBase {
  private initialState?: RootState;

  constructor(engine: EngineBase) {
    const initialState = engine
      .getDependEngine(基础引擎)
      .getLocalItem<RootState>(localStateFieldName);

    super(engine, {
      invokeRequiredModules: false,
    });

    this.initialState = initialState;
    this.requireModules();
  }

  requireModules() {
    super.requireModules(
      事件中心系统.getInstance(this.engine),
      this.engine.getModuleOrCreate(界面导航系统),
      new 界面状态仓库模块(this.engine, this.initialState),
    );
  }

  注册指针移动监听() {
    this.getDependModule(事件中心系统).on(
      '项目树历史记录管理者/指针移动',
      (event) => {
        this.getDependModule(界面状态仓库模块).store.dispatch(
          this.getDependModule(
            界面状态仓库模块,
          ).slices.projectTree.actions.更新项目节点树(
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
    let prevState = this.getDependModule(界面状态仓库模块).store.getState();
    this.getDependModule(界面状态仓库模块).store.subscribe(() => {
      const nextState = this.getDependModule(界面状态仓库模块).store.getState();
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
    const userInfo = this.engine.getDependEngine(基础引擎).loginUser;

    if (userInfo) {
      this.getDependModule(界面状态仓库模块).store.dispatch(
        this.getDependModule(
          界面状态仓库模块,
        ).slices.userInfo.actions.更新用户名(userInfo.name),
      );
    }

    this.getDependModule(事件中心系统).on(
      '用户模型表/获取登录用户信息成功',
      ({ userInfo }) => {
        this.getDependModule(界面状态仓库模块).store.dispatch(
          this.getDependModule(
            界面状态仓库模块,
          ).slices.userInfo.actions.更新用户名(userInfo.name),
        );
      },
    );

    this.getDependModule(事件中心系统).on(
      '用户模型表/登录用户信息清理成功',
      () => {
        this.getDependModule(界面状态仓库模块).store.dispatch(
          this.getDependModule(
            界面状态仓库模块,
          ).slices.userInfo.actions.更新用户名(''),
        );
      },
    );
  }

  监听项目节点激活状态变化并修改url() {
    let previousState = this.getDependModule(界面状态仓库模块).store.getState(); // 初始化之前的 state
    this.getDependModule(界面状态仓库模块).store.subscribe(() => {
      const currentState =
        this.getDependModule(界面状态仓库模块).store.getState(); // 获取当前的 state

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
              this.getDependModule(界面导航系统).navigateTo(
                pathItems['view-editor'],
              );
            } else if (nodeData.projectFileType === ProjectTypeEnum.Bluemap) {
              this.getDependModule(界面导航系统).navigateTo(
                pathItems['bluemap-editor'],
              );
            } else if (nodeData.projectFileType === ProjectTypeEnum.DataTable) {
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
    const { store } = this.getDependModule(界面状态仓库模块);
    store.subscribe(() => {
      const state = store.getState();
      const next = this.过滤掉某些不存储到本地的state(state);
      this.engine.engineManager
        .getEngine(基础引擎)
        .setLocalItem(localStateFieldName, next);
    });
  }

  protected async onSetup(): Promise<void> {
    this.注册用户信息监听();
    this.监听项目节点激活状态变化并修改url();
    this.注册监听保存状态到本地();
    this.注册路由更新监听();
    this.注册指针移动监听();
  }

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
