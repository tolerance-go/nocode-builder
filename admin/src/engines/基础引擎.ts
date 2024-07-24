import { EngineBase } from '@/base';
import { 状态本地持久化内存模型管理模块 } from '@/modules/状态本地持久化内存模型管理模块';

export class 基础引擎 extends EngineBase {
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
    super.providerModules(new 状态本地持久化内存模型管理模块(this));
  }
}
