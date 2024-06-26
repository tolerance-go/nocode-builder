import { CustomTreeDataNode } from "@/types/tree";
import { states } from "../states";

export const setTreeData = (newTreeData: CustomTreeDataNode[]) => {
  states.treeData = Promise.resolve(newTreeData);
};
