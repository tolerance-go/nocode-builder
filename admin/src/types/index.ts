export * from './form';
export * from './tree';
export * from './store';

export interface System {
  launch(...args: unknown[]): void;
}

export interface Manager {
  work(...args: unknown[]): void;
}

export interface EnvObject {
  initialize(...args: unknown[]): void;
}
