import { TreeNode } from '../types';

export type 操作类型 = '插入' | '删除' | '移动' | '更新';

export interface 更新操作详情<T> {
  节点key: string;
  oldRecordItem: T;
  newRecordItem: T;
}

export interface 插入操作详情<T> {
  父节点key: string | null;
  index: number;
  recordItems: T[];
  节点keys: string[];
}

export interface 删除操作详情 {
  节点keys: string[];
}

export interface 移动操作详情 {
  节点keys: string[];
  目标父节点key: string;
}

export type 操作详情<T> =
  | { type: '插入'; detail: 插入操作详情<T> }
  | { type: '删除'; detail: 删除操作详情 }
  | { type: '更新'; detail: 更新操作详情<T> }
  | { type: '移动'; detail: 移动操作详情 };

export interface DiffResult<T> {
  删除: 删除操作详情;
  移动: 移动操作详情[];
  插入: 插入操作详情<T>[];
}

export function compareTrees<T extends TreeNode<T>>(
  oldTree: T[],
  newTree: T[],
): DiffResult<T> {
  const oldNodes = new Map<string | number, T>();
  const newNodes = new Map<string | number, T>();
  const oldParentMap = new Map<string | number, string | number | null>();
  const newParentMap = new Map<string | number, string | number | null>();

  function traverse(
    node: T,
    map: Map<string | number, T>,
    parentMap: Map<string | number, string | number | null>,
    parentKey: string | number | null = null,
  ) {
    map.set(node.key, node);
    parentMap.set(node.key, parentKey);
    if (node.children) {
      node.children.forEach((child) =>
        traverse(child, map, parentMap, node.key),
      );
    }
  }

  oldTree.forEach((node) => traverse(node, oldNodes, oldParentMap));
  newTree.forEach((node) => traverse(node, newNodes, newParentMap));

  const 删除: 删除操作详情 = { 节点keys: [] };
  const 移动: 移动操作详情[] = [];
  const 插入: 插入操作详情<T>[] = [];

  oldNodes.forEach((node, key) => {
    if (!newNodes.has(key)) {
      删除.节点keys.push(key as string);
    }
  });

  newNodes.forEach((node, key) => {
    if (!oldNodes.has(key)) {
      const 父节点key = newParentMap.get(key) as string | null;
      const 父节点 = 父节点key ? newNodes.get(父节点key) : null;
      const index = 父节点
        ? 父节点.children?.indexOf(node) ?? 0
        : newTree.indexOf(node);

      const existingInsert = 插入.find(
        (insert) => insert.父节点key === 父节点key,
      );

      if (existingInsert) {
        existingInsert.recordItems.push(node);
        existingInsert.节点keys.push(key as string);
      } else {
        插入.push({
          父节点key,
          index,
          recordItems: [node],
          节点keys: [key as string],
        });
      }
    }
  });

  oldNodes.forEach((node, key) => {
    if (newNodes.has(key)) {
      const oldParentKey = oldParentMap.get(key);
      const newParentKey = newParentMap.get(key);
      if (oldParentKey !== newParentKey) {
        移动.push({
          节点keys: [key as string],
          目标父节点key: (newParentKey as string) || '',
        });
      }
    }
  });

  return { 删除, 移动, 插入 };
}
