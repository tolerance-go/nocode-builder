import { EngineBase } from '../Engine';

export class EngineManagerBase {
  private providedEngines: Set<EngineBase>;
  private allEngines: Set<EngineBase>;

  constructor() {
    this.providedEngines = new Set();
    this.allEngines = new Set();
  }

  public async launch() {
    this.providerEngines();
    await this.launchEngines(Array.from(this.allEngines));
  }

  public getEngine<T extends EngineBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T {
    const engine = this.findEngine(engineClass);
    if (engine) {
      return engine;
    }
    throw new Error(`Engine of type ${engineClass.name} not found`);
  }

  public getProvidedEngines<T extends EngineBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T[] {
    return Array.from(this.providedEngines).filter(
      (engine) => engine instanceof engineClass,
    ) as T[];
  }

  public onEngineAdded(engine: EngineBase) {
    this.allEngines.add(engine);
  }

  public toJSON(): object {
    return {
      name: this.constructor.name,
    };
  }

  protected providerEngines(...engines: EngineBase[]) {
    // 初始化 Actors
    engines.forEach((engine) => {
      this.providedEngines.add(engine);
    });
  }

  private async launchEngines(engines: EngineBase[]) {
    await Promise.all(engines.map((engine) => engine.launch()));
  }

  private findEngine<T extends EngineBase>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    engineClass: new (...args: any[]) => T,
  ): T | undefined {
    for (const engine of this.allEngines) {
      if (engine instanceof engineClass) {
        return engine;
      }
    }
  }
}
