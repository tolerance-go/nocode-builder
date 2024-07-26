import { EngineBase } from '@/base';
import {
  ClientUserModel,
  UserModelTable,
} from '@/modules/model-tables/UserModelTable';
import { 全局事件系统 } from '@/modules/全局事件系统';
import { 后台数据模型管理器模块 } from '@/modules/后台数据模型管理器模块';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';

export class 基础引擎 extends EngineBase {
  public get currentUser(): ClientUserModel {
    return this.getModule(后台数据模型管理器模块).getDependModule(
      UserModelTable,
    ).currentUser;
  }

  setLocalItem<T>(key: string, value: T): void {
    this.getModule(状态本地持久化内存模型管理模块).set(key, value);
  }

  getLocalItem<T>(key: string): T | undefined {
    return this.getModule(状态本地持久化内存模型管理模块).get(key);
  }

  removeLocalItem(key: string): void {
    this.getModule(状态本地持久化内存模型管理模块).remove(key);
  }

  protected providerModules() {
    super.providerModules(
      new 全局事件系统(this),
      new 状态本地持久化内存模型管理模块(this),
      new 后台数据模型管理器模块(this),
    );
  }
}
