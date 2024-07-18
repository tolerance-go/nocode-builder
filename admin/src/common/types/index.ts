export interface Actor {
  requiredActors: Set<Actor>; // 当前 Actor 依赖的 Actors
  dependentActors: Set<Actor>; // 依赖当前 Actor 的 Actors
  requires(...actors: Actor[]): this;
  setupProcessing: PromiseWithResolvers<void>;
  startProcessing: PromiseWithResolvers<void>;
  start(...args: unknown[]): Promise<void>;
  setup(...args: unknown[]): Promise<void>;
  requireActor<T extends Actor>(actorClass: new (...args: unknown[]) => T): T;
}

export interface System extends Actor {}

export interface Manager extends Actor {}
export interface Employee extends Actor {}

export interface EnvObject extends Actor {}

export type ViewKey = number | string;
