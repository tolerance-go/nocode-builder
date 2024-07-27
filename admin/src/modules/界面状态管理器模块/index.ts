import { ProjectTypeEnum } from '@/_gen/models';
import { EngineBase, ModuleBase } from '@/base';
import { pathItems } from '@/common/constants';
import { 基础引擎 } from '@/engines/基础引擎';
import { produce } from 'immer';
import { 事件中心系统 } from '../事件中心系统';
import { 界面导航系统 } from '../界面导航系统';
import { 界面状态仓库模块 } from '../界面状态仓库模块';
import { localStateFieldName } from '../界面状态仓库模块/constants';
import { RootState } from '../界面状态仓库模块/types';
import { 用户表模块 } from '../models/用户表模块';
import { 本地数据管理模块 } from '../本地数据管理模块';

export class UIStoreManager extends ModuleBase {
  private static instance: UIStoreManager;

  public static getInstance(engine: EngineBase): UIStoreManager {
    if (!UIStoreManager.instance) {
      UIStoreManager.instance = new UIStoreManager(engine);
    }

    return UIStoreManager.instance;
  }

  private initialState?: RootState;

  constructor(engine: EngineBase) {
    const initialState = engine
      .getDependEngine(基础引擎)
      .getModule(本地数据管理模块)
      .get<RootState>(localStateFieldName);

    super(engine, {
      invokeRequiredModules: false,
    });

    this.initialState = initialState;
    this.requireModules();
  }

  requireModules() {
    super.requireModules(
      本地数据管理模块.getInstance(this.engine),
      用户表模块.getInstance(this.engine),
      事件中心系统.getInstance(this.engine),
      界面导航系统.getInstance(this.engine),
      界面状态仓库模块.getInstance(this.engine, this.initialState),
    );
  }

  protected async onSetup(): Promise<void> {
    this.注册用户信息监听();
    this.监听项目节点激活状态变化并修改url();
    this.注册监听保存状态到本地();
    this.注册路由更新监听();
    this.注册指针移动监听();
  }
}
