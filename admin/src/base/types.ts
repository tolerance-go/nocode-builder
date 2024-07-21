export interface EngineManager {
  launch(...args: unknown[]): Promise<void>;
  getEngine<T extends Engine>(actorClass: new (...args: unknown[]) => T): T;
}

export interface Engine {
  requiredEngines: Set<Engine>; // 当前 Actor 依赖的 Actors
  dependentEngines: Set<Engine>; // 依赖当前 Actor 的 Actors
  launchProcessing: PromiseWithResolvers<void>;
  engineManager: EngineManager;
  launch(...args: unknown[]): Promise<void>;
  getDependEngine<T extends Engine>(
    actorClass: new (...args: unknown[]) => T,
  ): T;
}

export interface Module {
  requiredModules: Set<Module>; // 当前 Actor 依赖的 Actors
  dependentModules: Set<Module>; // 依赖当前 Actor 的 Actors
  setupProcessing: PromiseWithResolvers<void>;
  startProcessing: PromiseWithResolvers<void>;
  engine: Engine;
  start(...args: unknown[]): Promise<void>;
  setup(...args: unknown[]): Promise<void>;
  getDependModule<T extends Module>(
    actorClass: new (...args: unknown[]) => T,
  ): T;
}

export interface System extends Module {}

export interface Manager extends Module {}

export interface Environment extends Module {}
