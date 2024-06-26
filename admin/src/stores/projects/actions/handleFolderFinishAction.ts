import { createProjectGroup } from "@/services/api/createProjectGroup";
import { treeStore } from "../stores";
import { setTreeDataAction } from "./setTreeDataAction";
import { parseId, updateNodeTitle, deleteNode } from "./_utils/base";
import { findParentNode } from "./_utils/findParentNode";

export const handleFolderFinishAction = async (
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
      treeStore.addFolderLoading = true;
      const result = await createProjectGroup({
        name: title,
        parentGroupId: parentKey as number,
      });
      return result.id;
    } finally {
      treeStore.addFolderLoading = false;
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
    updateNodeTitle(key, value, `group-${result}`, result);
  } catch {
    setTreeDataAction(deleteNode(await treeStore.treeData, key));
  }
};
