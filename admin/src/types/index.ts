export interface Actor {
  requires(...actors: Actor[]): this;
  startProcessing: Promise<void>;
  setup(...args: unknown[]): Promise<void>;
  requireActor<T extends Actor>(actorClass: new (...args: unknown[]) => T): T;
}

export interface System extends Actor {}

export interface Manager extends Actor {}

export interface EnvObject extends Actor {}

export type ViewKey = number | string;
