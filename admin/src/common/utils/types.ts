// 递归 Readonly 工具类型
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type PickAndOptional<T, K extends keyof T, O extends keyof T> = {
  [P in Exclude<K, O>]-?: T[P]; // 必选的键，排除 O 中的键
} & {
  [P in O]?: T[P]; // 可选的键
};

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type ReplaceKeyType<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P];
};

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type OneOf<T> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

export type ValueOfRecord<T extends Record<string, unknown>> = T[keyof T];
