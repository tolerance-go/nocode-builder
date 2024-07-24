import { EngineBase } from '../Engine';
import { Module } from '../types';

export class ModuleBase implements Module {
  public setupProcessing: PromiseWithResolvers<void>;
  public startProcessing: PromiseWithResolvers<void>;
  public engine: EngineBase;
  public requiredModules: Set<Module> = new Set(); // 当前 Module 依赖的 Modules

  protected hasStarted: boolean = false; // 用于跟踪 start 方法是否已经执行过
  protected hasSetup: boolean = false; // 用于跟踪 start 方法是否已经执行过

  constructor(engine: EngineBase) {
    this.setupProcessing = Promise.withResolvers<void>();
    this.startProcessing = Promise.withResolvers<void>();
    this.engine = engine;
    this.engine.onModuleAdded(this);
    this.requireModules();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDependModule<T extends Module>(moduleClass: new (...args: any[]) => T): T {
    for (const module of this.requiredModules) {
      if (module instanceof moduleClass) {
        return module;
      }
    }
    throw new Error(`Module of type ${moduleClass.name} not found`);
  }

  getDependModules<T extends Module>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleClass: new (...args: any[]) => T,
  ): T[] {
    return Array.from(this.requiredModules).filter(
      (module) => module instanceof moduleClass,
    ) as T[];
  }

  // 启动
  async setup(): Promise<void> {
    if (this.hasSetup) {
      throw new Error('Module already setup');
    }

    await Promise.all(
      Array.from(this.requiredModules).map(
        (module) => module.setupProcessing.promise,
      ),
    );
    await this.onSetup(); // 调用 start 逻辑函数
    this.setupProcessing.resolve();
    this.hasSetup = true; // 标记为已启动
  }

  async start(): Promise<void> {
    if (this.hasStarted) {
      throw new Error('Module already started');
    }

    await Promise.all(
      Array.from(this.requiredModules).map(
        (module) => module.startProcessing.promise,
      ),
    );
    await this.onStart(); // 调用 start 逻辑函数
    this.startProcessing.resolve();
    this.hasStarted = true; // 标记为已启动
  }

  public toJSON(): object {
    return {
      name: this.constructor.name,
    };
  }

  // 抽象的 start 逻辑函数，需要在继承类中实现
  protected async onSetup(): Promise<void> {}
  protected async onStart(): Promise<void> {}

  // 导入其他 Module
  protected requireModules(...modules: Module[]) {
    modules.forEach((module) => {
      if (!this.requiredModules.has(module)) {
        this.requiredModules.add(module);
      }
    });
  }
}
