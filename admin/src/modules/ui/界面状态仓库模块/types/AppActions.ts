import { AppSlices } from './creates';

type SliceActions<Slice> = Slice extends { actions: infer A } ? A : never;

type AllActions = {
  [K in keyof AppSlices]: SliceActions<AppSlices[K]>;
};

// 牛逼
type ExtractPayload<A> = A extends (...args: infer P) => unknown
  ? P extends [infer First, ...unknown[]]
    ? First
    : never
  : never;

// 获取 actions 类型
export type AppActions = {
  [K in keyof AllActions]: {
    [A in keyof AllActions[K]]: {
      type: `${K}/${Extract<A, string>}`;
      payload: ExtractPayload<AllActions[K][A]>;
    };
  }[keyof AllActions[K]];
}[keyof AllActions];
