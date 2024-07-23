import { EngineBase, ModuleBase } from '@/base';

/**
 * 状态本地持久化内存模型管理模块
 *
 * 是什么: 一个用于管理本地状态内存模型的模块类
 *
 * 为了什么用户: 需要在应用程序中同步管理本地状态数据的开发者
 *
 * 解决什么问题: 该模块类通过维护一个内存中的状态数据对象，提供同步的 set 和 get 方法，以便于快速访问和修改状态数据
 *
 * 以便于: 开发者能够方便地管理应用状态数据，并在需要时快速访问或更新这些数据
 */
export class 状态本地持久化内存模型管理模块 extends ModuleBase {
  private localData: Record<string, unknown>;

  constructor(engine: EngineBase) {
    super(engine);
    this.localData = {};
  }

  // 同步设置数据到本地状态
  set<T>(key: string, value: T): void {
    this.localData[key] = value;
    console.log(`数据已设置: ${key}`, value);
  }

  // 同步获取本地状态中的数据
  get<T>(key: string): T | undefined {
    const data = this.localData[key];
    console.log(`获取数据: ${key}`, data);
    return data as T | undefined;
  }

  // 从本地状态中删除数据
  remove(key: string): void {
    delete this.localData[key];
    console.log(`数据已删除: ${key}`);
  }

  // 打印当前的本地状态数据
  printLocalData(): void {
    console.log('当前本地状态数据:', this.localData);
  }

  // 在 setup 阶段执行的逻辑
  protected async onSetup(): Promise<void> {
    // 这里可以添加模块 setup 阶段需要执行的逻辑
    console.log('状态本地持久化内存模型管理模块 setup 完成');
  }

  // 在 start 阶段执行的逻辑
  protected async onStart(): Promise<void> {
    // 这里可以添加模块 start 阶段需要执行的逻辑
    console.log('状态本地持久化内存模型管理模块 start 完成');
  }
}
