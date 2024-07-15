import { DataKey } from '@/types';
import { TreeNodeBase } from '../types';

export type 操作类型 = '新增' | '删除' | '移动' | '更新';

export interface 更新操作详情<T> {
  节点key: DataKey;
  oldRecordItem: T;
  newRecordItem: T;
}

export interface 新增操作详情<T> {
  父节点key: DataKey | null;
  index: number;
  recordItems: T[];
  节点keys: DataKey[];
}

export interface 删除操作详情<T> {
  节点keys: DataKey[];
  recordItems: T[];
}

export interface 移动操作详情<T> {
  节点keys: DataKey[];
  目标父节点key: DataKey | null;
  index: number;
  recordItems: T[];
}

export type 操作详情<T> =
  | { type: '新增'; detail: 新增操作详情<T> }
  | { type: '删除'; detail: 删除操作详情<T> }
  | { type: '更新'; detail: 更新操作详情<T> }
  | { type: '移动'; detail: 移动操作详情<T> };

export interface DiffResult<T> {
  删除: 删除操作详情<T>;
  移动: 移动操作详情<T>[];
  新增: 新增操作详情<T>[];
  更新?: 更新操作详情<T>[];
}

export function compareTrees<T extends TreeNodeBase>(
  oldTree: T[],
  newTree: T[],
  isNodeUpdated?: (oldNode: T, newNode: T) => boolean,
): DiffResult<T> {
  const oldNodes = new Map<DataKey, T>();
  const newNodes = new Map<DataKey, T>();
  const oldParentMap = new Map<DataKey, DataKey | null>();
  const newParentMap = new Map<DataKey, DataKey | null>();
  const 删除: 删除操作详情<T> = { 节点keys: [], recordItems: [] };
  const 移动: 移动操作详情<T>[] = [];
  const 新增: 新增操作详情<T>[] = [];
  const 更新: 更新操作详情<T>[] = [];

  function traverse<N extends TreeNodeBase>(
    node: N,
    map: Map<DataKey, N>,
    parentMap: Map<DataKey, DataKey | null>,
    parentDataKey: DataKey | null = null,
  ) {
    map.set(node.key, node);
    parentMap.set(node.key, parentDataKey);
    if (node.children) {
      node.children.forEach((child) =>
        traverse(child, map, parentMap, node.key),
      );
    }
  }

  oldTree.forEach((node) => traverse(node, oldNodes, oldParentMap));
  newTree.forEach((node) => traverse(node, newNodes, newParentMap));

  oldNodes.forEach((node, key) => {
    if (newNodes.has(key)) {
      const newNode = newNodes.get(key) as T;
      const oldParentDataKey = oldParentMap.get(key);
      const newParentDataKey = newParentMap.get(key);

      if (isNodeUpdated && isNodeUpdated(node, newNode)) {
        更新.push({
          节点key: key,
          oldRecordItem: node,
          newRecordItem: newNode,
        });
      }

      if (oldParentDataKey !== newParentDataKey) {
        const index = newParentMap.has(key) ? newTree.indexOf(newNode) : -1;
        const finalIndex = index === -1 ? 0 : index;
        移动.push({
          节点keys: [key],
          目标父节点key: newParentDataKey as DataKey | null,
          index: finalIndex,
          recordItems: [newNode],
        });
      }
    } else {
      if (
        !oldParentMap.has(key) ||
        !删除.节点keys.includes(oldParentMap.get(key) as DataKey)
      ) {
        删除.节点keys.push(key);
        删除.recordItems.push(node);
      }
    }
  });

  newNodes.forEach((node, key) => {
    if (!oldNodes.has(key)) {
      const 父节点key = newParentMap.get(key) as DataKey | null;
      const 父节点 = 父节点key ? newNodes.get(父节点key) : null;
      const index = 父节点
        ? 父节点.children?.indexOf(node) ?? 0
        : newTree.indexOf(node);

      const parentExistsInOldTree = 父节点key ? oldNodes.has(父节点key) : true;
      if (parentExistsInOldTree) {
        const existingInsert = 新增.find(
          (insert) => insert.父节点key === 父节点key,
        );

        if (existingInsert) {
          existingInsert.recordItems.push(node);
          existingInsert.节点keys.push(key);
        } else {
          新增.push({
            父节点key,
            index,
            recordItems: [node],
            节点keys: [key],
          });
        }
      }
    }
  });

  const result: DiffResult<T> = { 删除, 移动, 新增 };
  if (isNodeUpdated) {
    result.更新 = 更新;
  }

  return result;
}
