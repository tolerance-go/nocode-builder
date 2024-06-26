import { CustomTreeDataNode } from "@/root/admin/ProjectTree/TreeMenu";
import { states } from "../states";
import { setExpandedKeys } from "./setExpandedKeys";
import { setTreeData } from "./setTreeData";

const addNode = (
  data: CustomTreeDataNode[],
  targetKey?: React.Key,
): CustomTreeDataNode[] => {
  const newKey = `project-${Date.now()}`;
  if (!targetKey) {
    const folderIndex = data.findLastIndex((item) => item.children);
    const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
    return [
      ...data.slice(0, insertIndex),
      {
        title: "",
        key: newKey,
        isEditing: true,
        isLeaf: true,
      },
      ...data.slice(insertIndex),
    ];
  }

  let isInserted = false;
  const insertNode = (items: CustomTreeDataNode[]): CustomTreeDataNode[] => {
    return items.map((item) => {
      if (item.key === targetKey) {
        const parentFolder = item;
        if (parentFolder.children) {
          if (!states.expandedKeys.includes(parentFolder.key)) {
            setExpandedKeys([...states.expandedKeys, parentFolder.key]);
          }
          isInserted = true;
          const indexToInsert = parentFolder.children.findIndex(
            (child) => !child.children,
          );
          const insertIndex =
            indexToInsert === -1 ? parentFolder.children.length : indexToInsert;
          const newChildren = [
            ...parentFolder.children.slice(0, insertIndex),
            {
              title: "",
              key: newKey,
              isEditing: true,
              isLeaf: true,
            },
            ...parentFolder.children.slice(insertIndex),
          ];
          return {
            ...item,
            children: newChildren,
          };
        }
      }
      if (item.children && !isInserted) {
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
    const folderIndex = data.findLastIndex((item) => item.children);
    const insertIndex = folderIndex === -1 ? 0 : folderIndex + 1;
    return [
      ...data.slice(0, insertIndex),
      {
        title: "",
        key: newKey,
        isEditing: true,
        isLeaf: true,
      },
      ...data.slice(insertIndex),
    ];
  }

  return result;
};

export const addFile = async (targetKey?: React.Key) => {
  setTreeData(addNode(await states.treeData, states.selectedKey ?? targetKey));
};
