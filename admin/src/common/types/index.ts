export interface Module {
  requiredActors: Set<Module>; // 当前 Actor 依赖的 Actors
  dependentActors: Set<Module>; // 依赖当前 Actor 的 Actors
  requires(...actors: Module[]): this;
  setupProcessing: PromiseWithResolvers<void>;
  startProcessing: PromiseWithResolvers<void>;
  start(...args: unknown[]): Promise<void>;
  setup(...args: unknown[]): Promise<void>;
  getDependModule<T extends Module>(
    actorClass: new (...args: unknown[]) => T,
  ): T;
}

export interface System extends Module {}

export interface Manager extends Module {}

export interface EnvObject extends Module {}

export type ViewKey = number | string;
