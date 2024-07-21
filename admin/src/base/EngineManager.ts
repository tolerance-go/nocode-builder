import { Engine } from '@/common/types';
import { topologicalSort } from '@/common/utils';

export type EngineConstructor =
  | Engine
  | ((engineManager: EngineManager) => Engine);

export class EngineManager {
  private engines: Set<Engine>;
  private dependencies: Map<Engine, Set<Engine>>;
  private dependents: Map<Engine, Set<Engine>>;

  constructor(...engineConstructors: EngineConstructor[]) {
    this.engines = new Set();
    this.dependencies = new Map();
    this.dependents = new Map();
    this.initEngines(engineConstructors);
  }

  private initEngines(engineConstructors: EngineConstructor[]) {
    // 初始化 Actors
    engineConstructors.forEach((ctor) => {
      let engine: Engine;
      if (typeof ctor === 'function') {
        engine = ctor(this);
      } else {
        engine = ctor;
      }
      this.engines.add(engine);
    });

    // 收集依赖关系
    this.collectDependencies();
  }

  private collectDependencies() {
    this.engines.forEach((engine) => {
      const deps = engine.requiredEngines;
      this.dependencies.set(engine, deps);

      deps.forEach((dep) => {
        if (!this.dependents.has(dep)) {
          this.dependents.set(dep, new Set());
        }
        this.dependents.get(dep)?.add(engine);
      });
    });
  }

  public async launch() {
    const sortedActors = topologicalSort(this.engines, this.dependencies);
    await this.launchEngines(sortedActors);
  }

  private async launchEngines(engines: Engine[]) {
    await Promise.all(engines.map((engine) => engine.launch()));
  }

  public getEngine<T extends Engine>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T {
    for (const engine of this.engines) {
      if (engine instanceof engineClass) {
        return engine;
      }
    }
    throw new Error(`Engine of type ${engineClass.name} not found`);
  }
}
