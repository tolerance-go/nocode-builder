import { EngineManager, Engine } from '../types';
import { collectDependencies, topologicalSort } from '../utils';

export class EngineManagerBase implements EngineManager {
  private engines: Set<Engine>;
  private dependencies: Map<Engine, Set<Engine>>;
  private dependents: Map<Engine, Set<Engine>>;

  constructor(...engineConstructors: Engine[]) {
    this.engines = new Set();
    this.dependencies = new Map();
    this.dependents = new Map();
    this.initEngines(engineConstructors);
  }

  public async launch() {
    const sortedActors = topologicalSort(this.engines, this.dependencies);
    await this.launchEngines(sortedActors);
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

  private initEngines(engineConstructors: Engine[]) {
    // 初始化 Actors
    engineConstructors.forEach((engine) => {
      engine.engineManager = this;
      engine.requiredEngines.forEach((requiredEngine) => {
        requiredEngine.engineManager = this;
      });

      this.engines.add(engine);
    });

    // 收集依赖关系
    collectDependencies(
      this.engines,
      this.dependencies,
      this.dependents,
      (engine) => engine.requiredEngines,
    );
  }

  private async launchEngines(engines: Engine[]) {
    await Promise.all(engines.map((engine) => engine.launch()));
  }
}
