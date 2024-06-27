import { TreeDataNode } from "antd";

export interface ProjectTreeDataNode
  extends Omit<TreeDataNode, "children" | "key" | "title"> {
  title: string;
  id: number;
  key: string;
  isEditing?: boolean;
  children?: ProjectTreeDataNode[];
  type: "file" | "folder";
}
