import { CustomTreeDataNode } from "@/root/admin/ProjectTree/TreeMenu";
import { states } from "../states";

export const setTreeData = (newTreeData: CustomTreeDataNode[]) => {
  states.treeData = Promise.resolve(newTreeData);
};
