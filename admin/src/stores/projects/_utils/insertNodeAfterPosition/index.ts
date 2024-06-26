import { CustomTreeDataNode } from "@/types/tree";

/**
 * 在指定位置之后插入新节点
 *
 * 如果 index 在合法范围之前，就在最前面插入，如果在合法范围之后，就在最后插入
 *
 * 返回新数组
 *
 * @param nodes 数组
 * @param index 指定位置之后
 * @param newNode 新节点
 */
export const insertNodeAfterPosition = (
  nodes: CustomTreeDataNode[],
  index: number,
  newNode: CustomTreeDataNode,
): CustomTreeDataNode[] => {
  const newNodes = [...nodes];

  if (index < 0) {
    newNodes.unshift(newNode);
  } else if (index >= newNodes.length) {
    newNodes.push(newNode);
  } else {
    newNodes.splice(index + 1, 0, newNode);
  }

  return newNodes;
};
