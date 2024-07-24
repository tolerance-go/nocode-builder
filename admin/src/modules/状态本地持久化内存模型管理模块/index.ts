import { EngineBase, ModuleBase } from '@/base';

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
