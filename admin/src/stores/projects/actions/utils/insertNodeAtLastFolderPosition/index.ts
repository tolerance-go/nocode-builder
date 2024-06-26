import { CustomTreeDataNode } from "@/types/tree";
import { findNodeParent } from "../findNodeParent";
import { findNodeSameLevelLastFolderIndex } from "../findNodeSameLevelLastFolderIndex";
import { insertNodeAfterPosition } from "../insertNodeAfterPosition";

/**
 * 如何在同级目录中最后一个文件夹的位置插入一个新节点
 * 
 * @param node 同级节点
 * @param treeMap map
 * @param newNode 新节点
 */
export const insertNodeAtLastFolderPosition = (
  node: CustomTreeDataNode,
  treeMap: Map<string, CustomTreeDataNode>,
  newNode: CustomTreeDataNode,
) => {
  const index = findNodeSameLevelLastFolderIndex(node, treeMap);

  if (index > -1) {
    const parent = findNodeParent(node, treeMap);

    // 此处的 parent 一定存在
    const children = parent!.children;

    parent!.children = children
      ? insertNodeAfterPosition(children, index, newNode)
      : children;
  }
};
