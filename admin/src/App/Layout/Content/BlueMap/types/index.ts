import { Cell, Graph, Node } from "@antv/x6";
import { DataNode } from "antd/es/tree";
import { PortManager } from "@antv/x6/es/model/port";

export type BlueMapConnectPort = {
  /**
   * exec - 执行
   * ref - 对象引用
   * returnValue - 返回值
   * condition - 条件表达式
   * string - 字符串
   * int - 整数
   */
  type: "exec" | "ref" | "returnValue" | "condition" | "string" | "int";
  id: string;
};

export interface BlueMapNodeConfig<
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"]
> {
  /** 用于在所有 node config 中检索 */
  id: string;
  shapeName: string;
  /**
   * flowControl - 控制流节点
   * function - 函数调用节点
   */
  type: "flowControl" | "function";
  connections: {
    left?: BlueMapConnectPort[];
    right?: BlueMapConnectPort[];
  };
  component: React.FC<X6ReactComponentProps>;
  attrs?: Attrs;
}

export type NodeConfig<
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"]
> = {
  id: string;
  shape: string;
  ports?: Node.Defaults["ports"];
  attrs?: Attrs;
};

export interface SearchTreeNode extends DataNode {
  configId?: string;
  children?: SearchTreeNode[];
}

export interface X6ReactComponentProps {
  node: Node;
  graph: Graph;
}

export type BasePortLabelProps = {
  node: Node;
  port: PortManager.Port;
};

export type BasePortProps = {
  node: Node;
  port: PortManager.Port;
};
