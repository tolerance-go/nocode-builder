import { ProjectTypeEnum } from '@/_gen/models';
import { ModuleBase } from '@/base';
import { paths } from '@/common/constants';
import { api, 全局事件系统实例, 全局界面导航系统实例 } from '@/globals';
import { produce } from 'immer';
import store from 'store2';
import { localStateFieldName } from './constants';
import { RootState } from './types';
import { BaseEngine } from '@/engines/BaseEngine';
import { StoreModule } from '../StoreModule';
import { 全局事件系统 } from '../全局事件系统';
import { 界面导航系统 } from '../界面导航系统';

export class UIStoreManager extends ModuleBase {
  private initialState: RootState | null;

  constructor() {
    super();

    const localState = this.engine.engineManager
      .getEngine(BaseEngine)
      .getLocalStateItem<RootState>(localStateFieldName);

    this.initialState = localState;
  }

  requireModules() {
    super.requireModules(
      全局事件系统实例,
      全局界面导航系统实例,
      new StoreModule(this.initialState),
    );
  }

  注册指针移动监听() {
    this.getDependModule(全局事件系统).on(
      '项目树历史记录管理者/指针移动',
      (event) => {
        this.getDependModule(StoreModule).store.dispatch(
          this.getDependModule(
            StoreModule,
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
    let prevState = this.getDependModule(StoreModule).store.getState();
    this.getDependModule(StoreModule).store.subscribe(() => {
      const nextState = this.getDependModule(StoreModule).store.getState();
      if (
        nextState.location.pathname !== prevState.location.pathname &&
        nextState.location.pathname
      ) {
        this.getDependModule(全局事件系统).emit('界面状态管理者/路由更新', {
          pathname: nextState.location.pathname,
        });
      }
      prevState = nextState;
    });
  }

  注册同步用户信息监听() {
    let prevState = this.getDependModule(StoreModule).store.getState();
    this.getDependModule(StoreModule).store.subscribe(() => {
      const nextState = this.getDependModule(StoreModule).store.getState();
      if (nextState.userInfo.token !== prevState.userInfo.token) {
        this.请求同步用户信息();
      }
      prevState = nextState;
    });
  }

  async 请求同步用户信息() {
    const userInfo = await api.users.getUserByToken();
    this.getDependModule(StoreModule).store.dispatch(
      this.getDependModule(StoreModule).slices.userInfo.actions.更新用户名(
        userInfo.name,
      ),
    );
  }

  检查本地用户token同步到内存中() {
    const token = store.get('token');
    if (token) {
      this.getDependModule(StoreModule).store.dispatch(
        this.getDependModule(StoreModule).slices.userInfo.actions.更新token(
          token,
        ),
      );
    }
  }

  监听项目节点激活状态变化并修改url() {
    let previousState = this.getDependModule(StoreModule).store.getState(); // 初始化之前的 state
    this.getDependModule(StoreModule).store.subscribe(() => {
      const currentState = this.getDependModule(StoreModule).store.getState(); // 获取当前的 state

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
                paths['view-editor'],
              );
            } else if (nodeData.projectFileType === ProjectTypeEnum.Bluemap) {
              this.getDependModule(界面导航系统).navigateTo(
                paths['bluemap-editor'],
              );
            } else if (nodeData.projectFileType === ProjectTypeEnum.DataTable) {
              this.getDependModule(界面导航系统).navigateTo(
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
    this.getDependModule(StoreModule).store.subscribe(() => {
      const state = this.getDependModule(StoreModule).store.getState();

      const next = this.过滤掉某些不存储到本地的state(state);

      this.engine.engineManager
        .getEngine(BaseEngine)
        .setLocalStateItem(localStateFieldName, next);
    });
  }

  过滤掉某些不存储到本地的state(state: RootState): RootState {
    return produce(state, (draft) => {
      draft.location.pathname = null;
      draft.userInfo.token = null;
    });
  }

  protected async onSetup(): Promise<void> {
    this.监听项目节点激活状态变化并修改url();
    this.注册监听保存状态到本地();
    this.注册同步用户信息监听();
    this.检查本地用户token同步到内存中();
    this.注册路由更新监听();
    this.注册指针移动监听();
  }
}
