import { TreeDataNode } from "antd";

export interface CustomTreeDataNode
  extends Omit<TreeDataNode, "children" | "key"> {
  key: string;
  isEditing?: boolean;
  children?: CustomTreeDataNode[];
  parentKey?: string;
  id: number;
}
