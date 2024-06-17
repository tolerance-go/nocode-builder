import { DataNode } from "antd/es/tree";

export type NodeConfig = {
  id: string;
  shape: string;
};

export interface SearchTreeNode extends DataNode {
  configId?: string;
  children?: SearchTreeNode[];
}
