import { TreeDataNode } from "antd";

export interface ProjectTreeDataNode
  extends Omit<TreeDataNode, "children" | "key"> {
  id: number;
  key: string;
  isEditing?: boolean;
  children?: ProjectTreeDataNode[];
  type: "file" | "folder";
}
