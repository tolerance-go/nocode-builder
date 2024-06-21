import { Cell, Graph, Node } from "@antv/x6";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { DataNode } from "antd/es/tree";

export type SearchNodeSourceData = {
  nodeId: string;
  portId: string;
};

export type BlueMapPortCommonArgs = {
  text?: string;
};

export type BlueMapPortType =
  | "exec"
  | "ref"
  | "returnValue"
  | "condition"
  | "string"
  | "int";

export type ConnectionConstraintValidateParams =
  | {
      /** 连接 2 个节点场景 */
      scene: "connect";
      source: {
        node: Node;
      };
      target: {
        node: Node;
      };
    }
  | {
      /** 查询搜索节点菜单场景下 */
      scene: "search";
      source: {
        node: Node;
      };
      target?: {
        node: Node;
      };
    };

export type ConnectionConstraint = {
  selfIoType: "input" | "output";
  ioType: "input" | "output";
  portType: BlueMapPortType;
  validate?: (args: ConnectionConstraintValidateParams) => boolean;
};

export type ConnectingConstraints = {
  to?: {
    allow?: ConnectionConstraint[];
    prohibit?: ConnectionConstraint[];
  };
  from?: {
    allow?: ConnectionConstraint[];
    prohibit?: ConnectionConstraint[];
  };
};

export type BlueMapPortConfig = {
  id: string;
  type: BlueMapPortType;
  portConfigId: string;
  component: React.FC<BlueMapPortComponentProps>;
  edgeConfig: {
    strokeWidth: number;
    color: string;
  };
  constraints?: {
    connecting?: ConnectingConstraints;
  };
};

export type PortBlueMapAttrs = {
  args?: BlueMapPortCommonArgs;
  type: BlueMapPortType;
  ioType: "input" | "output";
};

export type BlueMapPort = {
  /**
   * exec - 执行
   * ref - 对象引用
   * returnValue - 返回值
   * condition - 条件表达式
   * string - 字符串
   * int - 整数
   */
  type: BlueMapPortConfig["type"];
  id: string;
  args?: BlueMapPortCommonArgs;
  width?: number;
  height?: number;
};

export type Connection = {
  ports: BlueMapPort[];
};

export type MenuGroups = {
  type: MenuGroupType;
  title: string;
  parentType?: MenuGroupType;
}[];

export type MenuGroupType = "flow-control" | "all";

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
    input?: Connection;
    output?: Connection;
  };
  component: React.FC<X6ReactComponentProps>;
  attrs?: Attrs;
  menu: {
    groupType: MenuGroupType[];
    title: string;
    key: string;
  };
}

export type NodeConfig<
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"]
> = {
  id: string;
  shapeName: string;
  shape: ReactShapeConfig;
  ports?: Node.Defaults["ports"];
  attrs?: Attrs;
};

export type PortConfig = {
  id: string;
  component: React.FC<ReactPortComponentProps>;
};

export interface SearchTreeNode extends DataNode {
  key: string;
  configId?: string;
  children?: SearchTreeNode[];
}

export interface X6ReactComponentProps {
  node: Node;
  graph: Graph;
}

export type ReactPortComponentProps = {
  node: Node;
  port: PortManager.Port;
  graph: Graph;
};

export type BlueMapPortComponentProps = {
  node: Node;
  port: PortManager.Port;
  graph: Graph;
  blueMapPort: {
    config: BlueMapPortConfig;
    args?: BlueMapPortCommonArgs;
  };
};
