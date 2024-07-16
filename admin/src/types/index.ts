export interface System {
  launch(...args: unknown[]): Promise<void>;
}

export interface Manager {
  isWorking(): boolean;
  work(...args: unknown[]): Promise<void>;
}

export interface EnvObject {
  activate(): Promise<void>;
}

export type ViewKey = number | string;
