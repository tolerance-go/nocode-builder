import { Key } from 'react';

export type TreeNodeBase = {
  key: Key;
  children?: TreeNodeBase[];
};

export type TreeNode<T extends TreeNodeBase = TreeNodeBase> = Omit<
  T,
  'children'
> & {
  key: Key;
  children?: TreeNode<T>[];
};
