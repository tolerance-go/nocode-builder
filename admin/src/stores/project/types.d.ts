export type TreeNode = {
  key: string;
  title: string;
  children: Array<TreeNode | ProjectLeafNode>;
};

export type ProjectLeafNode = {
  key: string;
  title: string;
  isLeaf: true;
};
