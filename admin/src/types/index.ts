export interface Actor {
  requires(...actors: Actor[]): this;
  startProcessing: Promise<void>;
  start(...args: unknown[]): Promise<void>;
  requireActor<T extends Actor>(actorClass: new (...args: unknown[]) => T): T;
}

export interface System extends Actor {
  launch(...args: unknown[]): Promise<void>;
}

export interface Manager extends Actor {
  work(...args: unknown[]): Promise<void>;
}

export interface EnvObject extends Actor {
  activate(...args: unknown[]): Promise<void>;
}

export type ViewKey = number | string;
