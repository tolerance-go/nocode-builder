import { Graph, Node } from "@antv/x6";
import { DataNode } from "antd/es/tree";

export type NodeConfig = {
  id: string;
  shape: string;
  ports?: Node.Defaults["ports"];
};

export interface SearchTreeNode extends DataNode {
  configId?: string;
  children?: SearchTreeNode[];
}

export interface X6ReactComponentProps {
  node: Node;
  graph: Graph;
}
