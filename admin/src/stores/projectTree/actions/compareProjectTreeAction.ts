import { ProjectStructureTreeDataNode, ProjectTreeCompareResult } from "@/types";

export function compareProjectTreeAction(
  oldTree: ProjectStructureTreeDataNode,
  newTree: ProjectStructureTreeDataNode,
): ProjectTreeCompareResult {
  const result: ProjectTreeCompareResult = {
    added: [],
    removed: [],
    moved: [],
    updated: [],
  };

  const oldMap = new Map<
    string,
    {
      node: ProjectStructureTreeDataNode;
      parent: ProjectStructureTreeDataNode | null;
      index: number;
    }
  >();
  const newMap = new Map<
    string,
    {
      node: ProjectStructureTreeDataNode;
      parent: ProjectStructureTreeDataNode | null;
      index: number;
    }
  >();

  // 构建旧树的节点Map
  function buildMap(
    node: ProjectStructureTreeDataNode,
    map: Map<
      string,
      {
        node: ProjectStructureTreeDataNode;
        parent: ProjectStructureTreeDataNode | null;
        index: number;
      }
    >,
    parent: ProjectStructureTreeDataNode | null = null,
    index: number = 0,
  ): void {
    map.set(node.key, { node, parent, index });
    if (node.children) {
      node.children.forEach((child, i) => buildMap(child, map, node, i));
    }
  }

  buildMap(oldTree, oldMap);
  buildMap(newTree, newMap);

  // 找出新增和更新的节点
  newMap.forEach((newNodeInfo, key) => {
    const oldNodeInfo = oldMap.get(key);
    if (!oldNodeInfo) {
      result.added.push(newNodeInfo.node);
    } else {
      if (newNodeInfo.node.title !== oldNodeInfo.node.title) {
        result.updated.push({
          oldNode: oldNodeInfo.node,
          newNode: newNodeInfo.node,
        });
      }
      if (
        newNodeInfo.parent &&
        oldNodeInfo.parent &&
        newNodeInfo.parent.key !== oldNodeInfo.parent.key
      ) {
        result.moved.push({
          node: newNodeInfo.node,
          oldParent: oldNodeInfo.parent,
          newParent: newNodeInfo.parent,
        });
      }
    }
  });

  // 找出删除的节点
  oldMap.forEach((oldNodeInfo, key) => {
    if (!newMap.has(key)) {
      result.removed.push(oldNodeInfo.node);
    }
  });

  return result;
}
