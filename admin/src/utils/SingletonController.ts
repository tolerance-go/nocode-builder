export abstract class SingletonController {
  private static instances: Map<new () => unknown, unknown> = new Map();

  // 私有化构造函数以防止外部实例化
  protected constructor() {}

  // 静态方法，用于获取单例实例
  public static getInstance<T extends SingletonController>(
    this: new () => T,
  ): T {
    if (!SingletonController.instances.has(this)) {
      SingletonController.instances.set(this, new this());
    }
    return SingletonController.instances.get(this) as T;
  }
}
