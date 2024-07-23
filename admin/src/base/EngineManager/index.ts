import { EngineManager, Engine } from '../types';
import { topologicalSort } from '../utils';

export type EngineConstructors = ((self: EngineManagerBase) => Engine)[];

export class EngineManagerBase implements EngineManager {
  private providedEngines: Set<Engine>;
  private allEngines: Set<Engine>;

  constructor(...engineConstructors: EngineConstructors) {
    this.providedEngines = new Set();
    this.allEngines = new Set();
    this.providerEngines(engineConstructors);
  }

  public async launch() {
    const sortedActors = topologicalSort(
      this.providedEngines,
      (engine) => engine.requiredEngines,
    );
    await this.launchEngines(sortedActors);
  }

  public getEngine<T extends Engine>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T {
    for (const engine of this.providedEngines) {
      if (engine instanceof engineClass) {
        return engine;
      }
    }
    throw new Error(`Engine of type ${engineClass.name} not found`);
  }

  public onEngineAdded(engine: Engine) {
    this.allEngines.add(engine);
  }

  public getEngines<T extends Engine>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T[] {
    return Array.from(this.providedEngines).filter(
      (engine) => engine instanceof engineClass,
    ) as T[];
  }

  private providerEngines(engineConstructors: EngineConstructors) {
    // 初始化 Actors
    engineConstructors.forEach((engineConstructor) => {
      const engine = engineConstructor(this);
      this.providedEngines.add(engine);
    });
  }

  private async launchEngines(engines: Engine[]) {
    await Promise.all(engines.map((engine) => engine.launch()));
  }
}
