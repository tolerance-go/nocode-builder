import { Key } from 'react';

export type TreeNodeBase = {
  key: Key;
  children?: TreeNodeBase[];
};

export type TreeNode<T extends TreeNodeBase = TreeNodeBase> = {
  key: Key;
  children?: TreeNode<T>[];
} & Omit<T, 'children'>;
