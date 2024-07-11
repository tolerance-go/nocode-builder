export * from './tree';

export interface System {
  launch(...args: unknown[]): void;
}

export interface Manager {
  work(...args: unknown[]): void;
}

export interface EnvObject {
  initialize(...args: unknown[]): EnvObject;

  activate(): void;
}
