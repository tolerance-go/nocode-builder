export * from './form';
export * from './tree';
export * from './store';

export interface System {
  launch(): void;
}
export interface Manager {
  work(): void;
}
