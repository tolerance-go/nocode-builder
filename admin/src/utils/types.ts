import { StateCreator } from 'zustand';

// 递归 Readonly 工具类型
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type PickAndOptional<T, K extends keyof T, O extends keyof T> = {
  [P in Exclude<K, O>]-?: T[P]; // 必选的键，排除 O 中的键
} & {
  [P in O]?: T[P]; // 可选的键
};

export type ImmerStateCreator<T, TT> = StateCreator<
  T,
  [['zustand/immer', never], never],
  [],
  TT
>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
