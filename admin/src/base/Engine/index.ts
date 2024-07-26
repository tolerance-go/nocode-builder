import { EngineManagerBase } from '../EngineManager';
import { ModuleBase } from '../Module';

export class EngineBase {
  public requiredEngines: Set<EngineBase> = new Set(); // 当前 Engine 依赖的 Engines
  public launchProcessing: PromiseWithResolvers<void>;
  public engineManager: EngineManagerBase;

  protected hasLaunched: boolean = false; // 用于跟踪 start 方法是否已经执行过

  private providedModules: Set<ModuleBase>;
  private allModules: Set<ModuleBase>;

  constructor(engineManager: EngineManagerBase) {
    this.providedModules = new Set();
    this.allModules = new Set();
    this.launchProcessing = Promise.withResolvers<void>();
    this.engineManager = engineManager;
    this.engineManager.onEngineAdded(this);
    this.requireEngines();
  }

  public getDependEngine<T extends EngineBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T {
    for (const engine of this.requiredEngines) {
      if (engine instanceof engineClass) {
        return engine;
      }
    }
    throw new Error(`Module of type ${engineClass.name} not found`);
  }

  public getDependEngines<T extends EngineBase>(
    engineClass: new (engineManager: EngineManagerBase) => T,
  ): T[] {
    return Array.from(this.requiredEngines).filter(
      (engine) => engine instanceof engineClass,
    ) as T[];
  }

  public async launch() {
    if (this.hasLaunched) {
      throw new Error('Engine already launch');
    }

    await Promise.all(
      Array.from(this.requiredEngines).map(
        (engine) => engine.launchProcessing.promise,
      ),
    );

    debugger;

    this.providerModules();
    const sortedActors = Array.from(this.allModules);
    await this.setupModules(sortedActors);
    await this.startModules(sortedActors);

    await this.onLaunch(); // 调用 start 逻辑函数
    this.launchProcessing.resolve();
    this.hasLaunched = true; // 标记为已启动
  }

  public getModule<T extends ModuleBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleClass: new (...args: any[]) => T,
  ): T {
    const module = this.findModule(moduleClass);
    if (module) {
      return module;
    }
    throw new Error(`Module of type ${moduleClass.name} not found`);
  }

  public toJSON(): object {
    return {
      name: this.constructor.name,
    };
  }

  public onModuleAdded(module: ModuleBase) {
    this.allModules.add(module);
  }

  public getProvidedModules<T extends ModuleBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleClass: new (...args: any[]) => T,
  ): T[] {
    return Array.from(this.providedModules).filter(
      (module) => module instanceof moduleClass,
    ) as T[];
  }

  protected async onLaunch(): Promise<void> {}

  protected requireEngines(...engines: EngineBase[]) {
    engines.forEach((engine) => {
      if (!this.requiredEngines.has(engine)) {
        this.requiredEngines.add(engine);
      }
    });
  }

  protected providerModules(...modules: ModuleBase[]) {
    modules.forEach((module) => {
      this.providedModules.add(module);
    });
  }

  private async setupModules(modules: ModuleBase[]) {
    await Promise.all(modules.map((module) => module.setup()));
  }

  private async startModules(modules: ModuleBase[]) {
    await Promise.all(modules.map((module) => module.start()));
  }

  private findModule<T extends ModuleBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleClass: new (...args: any[]) => T,
  ): T | undefined {
    for (const module of this.allModules) {
      if (module instanceof moduleClass) {
        return module;
      }
    }
  }
}
