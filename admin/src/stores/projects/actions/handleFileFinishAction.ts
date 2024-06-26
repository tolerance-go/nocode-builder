import { createProject } from "@/services/api/createProject";
import { treeStore } from "../stores";
import { setTreeDataAction } from "./setTreeDataAction";
import { findParentNode } from "./_utils/findParentNode";
import { deleteNode, parseId, updateNodeTitle } from "./_utils/base";

export const handleFileFinishAction = async (
  e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
  key: React.Key,
  defaultValue: string,
) => {
  const onAdd = async ({
    title,
    parentKey,
  }: {
    parentKey?: React.Key;
    key: React.Key;
    title: string;
  }) => {
    try {
      treeStore.addFileLoading = true;
      const result = await createProject({
        name: title,
        projectGroupId: parentKey as number,
      });
      return result.id;
    } finally {
      treeStore.addFileLoading = false;
    }
  };

  const value = (e.target as HTMLInputElement).value || defaultValue;
  const parentNode = findParentNode(await treeStore.treeData, key);
  try {
    const result = await onAdd({
      parentKey: parentNode ? parseId(parentNode.key as string) : undefined,
      key,
      title: value,
    });
    updateNodeTitle(key, value, `project-${result}`, result);
  } catch {
    setTreeDataAction(deleteNode(await treeStore.treeData, key));
  }
};
