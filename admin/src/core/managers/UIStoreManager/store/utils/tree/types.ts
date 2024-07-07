export type TreeNodeBase = {
  key: string | number;
  children?: TreeNodeBase[];
};

export type TreeNode<T = TreeNodeBase> = {
  key: number | string;
  children?: T[];
} & Omit<T, 'key' | 'children'>;
