import { TreeDataNode } from "antd";

export interface ProjectTreeDataNode
  extends Omit<TreeDataNode, "children" | "key" | "title"> {
  title: string;
  id: number;
  key: string;
  children?: ProjectTreeDataNode[];
  type: "file" | "folder";
}

export type ProjectTreeCompareResult = {
  added: ProjectTreeDataNode[];
  removed: ProjectTreeDataNode[];
  moved: {
    node: ProjectTreeDataNode;
    oldParent: ProjectTreeDataNode | null;
    newParent: ProjectTreeDataNode | null;
  }[];
  updated: { oldNode: ProjectTreeDataNode; newNode: ProjectTreeDataNode }[];
};
