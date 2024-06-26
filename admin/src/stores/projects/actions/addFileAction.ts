import { CustomTreeDataNode } from "@/types/tree";
import { treeStore, treeMapStore } from "../stores";
import { setExpandedKeysAction } from "./setExpandedKeys";
import { setTreeDataAction } from "./setTreeDataAction";

/**
 * 在树形数据中添加节点的函数
 * @param data 当前树形数据
 * @param targetKey 目标节点的key，可选
 * @returns 新的树形数据
 */
const addNode = (
  data: CustomTreeDataNode[],
  treeMap: Map<string, CustomTreeDataNode>,
  targetKey?: React.Key,
): CustomTreeDataNode[] => {
  const newKey = `project-${Date.now()}`; // 生成新的唯一key

  // 如果没有指定目标节点key，直接在根节点插入新的节点
  if (!targetKey) {
    const folderIndex = data.findLastIndex((item) => item.children); // 找到最后一个文件夹的位置
    const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1; // 插入位置
    return [
      ...data.slice(0, insertIndex),
      {
        title: "",
        key: newKey,
        isEditing: true,
        isLeaf: true,
        id: -1,
      },
      ...data.slice(insertIndex),
    ];
  }

  let isInserted = false; // 是否已插入标记

  /**
   * 递归函数，在指定位置插入新的节点
   * @param items 当前节点数组
   * @returns 新的节点数组
   */
  const insertNode = (items: CustomTreeDataNode[]): CustomTreeDataNode[] => {
    return items.map((item) => {
      if (item.key === targetKey) {
        const targetNode = item;

        // 如果目标节点是叶子节点，在其同级层级的所有文件夹之后插入
        if (targetNode.isLeaf) {
          // 找到目标叶子节点的父节点
          const parent = item.parentKey ? treeMap.get(item.parentKey) : null;
          if (parent) {
            if (!treeStore.expandedKeys.includes(parent.key)) {
              setExpandedKeysAction([...treeStore.expandedKeys, parent.key]); // 展开父文件夹
            }
            isInserted = true;
            const indexToInsert = parent.children!.findIndex(
              (child) => !child.children,
            ); // 找到第一个文件的位置
            const insertIndex =
              indexToInsert === -1 ? parent.children!.length : indexToInsert; // 插入位置
            const newChildren = [
              ...parent.children!.slice(0, insertIndex),
              {
                title: "",
                key: newKey,
                isEditing: true,
                isLeaf: true,
                id: -1,
              },
              ...parent.children!.slice(insertIndex),
            ];
            return {
              ...parent,
              children: newChildren,
            };
          }
        }

        if (targetNode.children) {
          // 如果目标节点有子节点（即为文件夹），在其子节点中插入新节点
          if (!treeStore.expandedKeys.includes(targetNode.key)) {
            setExpandedKeysAction([...treeStore.expandedKeys, targetNode.key]); // 展开目标文件夹
          }
          isInserted = true;
          const indexToInsert = targetNode.children.findIndex(
            (child) => !child.children,
          ); // 找到第一个文件的位置
          const insertIndex =
            indexToInsert === -1 ? targetNode.children.length : indexToInsert; // 插入位置
          const newChildren = [
            ...targetNode.children.slice(0, insertIndex),
            {
              title: "",
              key: newKey,
              isEditing: true,
              isLeaf: true,
              id: -1,
            },
            ...targetNode.children.slice(insertIndex),
          ];
          return {
            ...item,
            children: newChildren,
          };
        }
      }
      if (item.children && !isInserted) {
        // 递归处理子节点
        return {
          ...item,
          children: insertNode(item.children),
        };
      }
      return item;
    });
  };

  const result = insertNode(data);

  if (!isInserted) {
    // 如果未找到目标节点或者目标节点不是文件夹，在根节点插入新节点
    const folderIndex = data.findLastIndex((item) => item.children);
    const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
    return [
      ...data.slice(0, insertIndex),
      {
        title: "",
        key: newKey,
        isEditing: true,
        isLeaf: true,
        id: -1,
      },
      ...data.slice(insertIndex),
    ];
  }

  return result;
};

/**
 * 添加文件的导出函数
 * @param targetKey 目标节点的key，可选
 */
export const addFileAction = async (targetKey?: React.Key) => {
  const treeMap = await treeMapStore.data;
  setTreeDataAction(
    addNode(await treeStore.treeData, treeMap, treeStore.selectedKey ?? targetKey),
  );
};
