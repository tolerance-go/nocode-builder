import { CustomTreeDataNode } from "@/types/tree";
import { treeStore } from "../stores";

export const setTreeDataAction = (newTreeData: CustomTreeDataNode[]) => {
  treeStore.treeData = Promise.resolve(newTreeData);
};
