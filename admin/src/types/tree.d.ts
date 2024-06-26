import { TreeDataNode } from "antd";

export interface CustomTreeDataNode extends Omit<TreeDataNode, "children"> {
  isEditing?: boolean;
  children?: CustomTreeDataNode[];
  parentKey?: string;
  id: number;
}
