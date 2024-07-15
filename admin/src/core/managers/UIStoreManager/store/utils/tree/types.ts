import { ViewKey } from '@/types';

export type TreeNodeBase = {
  key: ViewKey;
  children?: TreeNodeBase[];
};

export type TreeNode<T extends TreeNodeBase = TreeNodeBase> = Omit<
  T,
  'children'
> & {
  key: ViewKey;
  children?: TreeNode<T>[];
};
