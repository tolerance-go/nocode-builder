export * from './tree';

export interface System {
  launch(...args: unknown[]): Promise<void>;
}

export interface Manager {
  work(...args: unknown[]): Promise<void>;
}

export interface EnvObject {
  activate(): Promise<void>;
}
