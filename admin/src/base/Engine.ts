import { EngineManagerBase } from './EngineManager';
import Module from 'module';
import { Engine } from './types';
import { collectDependencies, topologicalSort } from './utils';

export abstract class EngineBase implements Engine {
  public requiredEngines: Set<Engine> = new Set(); // 当前 Engine 依赖的 Engines
  public dependentEngines: Set<Engine> = new Set(); // 依赖当前 Engine 的 Engines
  public launchProcessing: PromiseWithResolvers<void>;

  private modules: Set<Module>;
  private dependencies: Map<Module, Set<Module>>;
  private dependents: Map<Module, Set<Module>>;
  private engineManagerInstance: EngineManagerBase | null = null;

  protected hasLaunched: boolean = false; // 用于跟踪 start 方法是否已经执行过

  constructor() {
    this.modules = new Set();
    this.dependencies = new Map();
    this.dependents = new Map();
    this.launchProcessing = Promise.withResolvers<void>();
    this.requireEngines();
  }

  set engineManager(instance: EngineManagerBase) {
    this.engineManagerInstance = instance;
  }

  get engineManager(): EngineManagerBase {
    if (!this.engineManagerInstance) {
      throw new Error('EngineManager not set');
    }

    return this.engineManagerInstance;
  }

  protected requireEngines(...engines: Engine[]) {
    engines.forEach((engine) => {
      if (!this.requiredEngines.has(engine)) {
        this.requiredEngines.add(engine);
        if (engine instanceof EngineBase) {
          engine.addDependentEngine(this);
        }
      }
    });
  }

  protected providerModules(...moduleConstructors: Module[]) {
    // 初始化 Actors
    moduleConstructors.forEach((module) => {
      module.engine = this;

      this.modules.add(module);
    });

    collectDependencies(
      this.modules,
      this.dependencies,
      this.dependents,
      (module) => module.requiredModules,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDependEngine<T extends Engine>(engineClass: new (...args: any[]) => T): T {
    for (const engine of this.requiredEngines) {
      if (engine instanceof engineClass) {
        return engine;
      }
    }
    throw new Error(`Module of type ${engineClass.name} not found`);
  }

  private addDependentEngine(module: Engine): void {
    this.dependentEngines.add(module);
  }

  public async launch() {
    if (this.hasLaunched) {
      throw new Error('Engine already launch');
    }

    await Promise.all(
      Array.from(this.requiredEngines).map(
        (module) => module.launchProcessing.promise,
      ),
    );

    this.providerModules();
    const sortedActors = topologicalSort(this.modules, this.dependencies);
    await this.setupModules(sortedActors);
    await this.startModules(sortedActors);

    await this.onLaunch(); // 调用 start 逻辑函数
    this.launchProcessing.resolve();
    this.hasLaunched = true; // 标记为已启动
  }

  private async setupModules(modules: Module[]) {
    await Promise.all(modules.map((module) => module.setup()));
  }

  private async startModules(modules: Module[]) {
    await Promise.all(modules.map((module) => module.start()));
  }

  public getModule<T extends Module>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleClass: new (...args: any[]) => T,
  ): T {
    for (const module of this.modules) {
      if (module instanceof moduleClass) {
        return module;
      }
    }
    throw new Error(`Module of type ${moduleClass.name} not found`);
  }

  protected async onLaunch(): Promise<void> {}
}
