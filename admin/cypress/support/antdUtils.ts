export const getTreeNodeIndents = (element: HTMLElement) => {
  const indents = element.querySelector('.ant-tree-indent');
  if (!indents) {
    throw new Error('未找到 ant-tree-indent 元素');
  }
  const indexUnits = indents.querySelectorAll('.ant-tree-indent-unit');

  return indexUnits;
};

// 获得 treeNode 的所有子节点
export const getTreeNodeChildren = ($treeNode: JQuery<HTMLElement>) => {
  const currentNodeIndexUnits = getTreeNodeIndents($treeNode[0]);
  const $children = $treeNode.nextAll().filter((_index, element) => {
    const indents = getTreeNodeIndents(element);
    return indents.length === currentNodeIndexUnits.length + 1;
  });

  return $children;
};

// 获得 treeNode 的父节点
export const getTreeNodeParent = ($treeNode: JQuery<HTMLElement>) => {
  const currentNodeIndexUnits = getTreeNodeIndents($treeNode[0]);

  const $parent = $treeNode.prevAll().filter((_index, element) => {
    const indents = getTreeNodeIndents(element);
    return indents.length === currentNodeIndexUnits.length - 1;
  });

  return $parent;
};
