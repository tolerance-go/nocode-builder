import { DataKey } from '@/types';

export type TreeNodeBase = {
  key: DataKey;
  children?: TreeNodeBase[];
};

export type TreeNode<T extends TreeNodeBase = TreeNodeBase> = Omit<
  T,
  'children'
> & {
  key: DataKey;
  children?: TreeNode<T>[];
};
