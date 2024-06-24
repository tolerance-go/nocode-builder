import { SettingConfig } from "@/components/SettingsForm";
import { DeepReadonly } from "@/utils/types";

export type DataKey = React.Key;

export interface RouteComponentData {
  type: "Route";
  path: string;
  element: NodeData[];
  children?: RouteComponentData[];
}

// 路由节点的接口定义
export interface RouteNode {
  id: string;
  path: string; // 路由路径
  children?: RouteNode[]; // 子路由
  name?: string; // 路由名称
}

export type StaticPropsValue = string | number | boolean | null | undefined;
export type StaticPropsArrayValue = StaticPropsValue[];

export type StaticProps = {
  [key: string]: StaticPropsValue | StaticProps;
};

export type SlotsChildren = {
  [key: string]: NodeData[];
};

export type NodeData<Settings = StaticProps> = {
  id: string;
  elementType: string;
  children?: SlotsChildren | NodeData[];
  styles: StaticProps;
  /**
   * 从哪个 widget 创建
   */
  fromWidgetId: string;
  /** 表单配置数据 */
  settings: Settings;
};

export interface RouteNodeData extends NodeData {
  elementType: "Route";
  children?: NodeData[];
}

export type DesignableComponentProps<
  Children extends React.ReactNode | Record<string, React.ReactNode> =
    | React.ReactNode
    | Record<string, React.ReactNode>,
  Settings extends StaticProps = StaticProps,
> = {
  style: StaticProps;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
  onClick: React.MouseEventHandler;
  children?: Children;
  node: DeepReadonly<NodeData<Settings>>;
  ["data-node-id"]: string;
  ["data-type"]: string;
  _preview?: boolean;
};

export type ComponentType = React.FC<DesignableComponentProps> | string;

export type InsertionPositions = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type SiteAgreementNavs = Array<
  string | SiteAgreementNavs | { [key: string]: SiteAgreementNavs }
>;

/**
 * 当前系统路径
 *
 * eg: [
 *  { type: 'nav', value: 'apps' },
 *  { type: "id", value: 'appId' },
 *  {
 *    type: 'nav',
 *    value: 'design',
 *    subNavs: {
 *      leftPanel: [{ type: 'nav', value: 'editor' }]
 *    }
 *  }
 * ]
 */
export type SystemPaths = {
  type: "nav" | "id";
  value: string;
  subPaths?: {
    [key: string]: SystemPaths;
  };
}[];

export type NavItem = {
  key: string;
  label: string;
  items?: NavItem[];
};

export type RectVisualPosition = "top" | "bottom" | "left" | "right";
export type VisualPosition = "inner" | RectVisualPosition;
export type DocumentInsertionPosition =
  | "inner"
  | "before"
  | "after"
  | "not-allowed";

/**
 * 部件
 */
export type Widget = ComponentWidget | GroupWidget;

/**
 * 部件事件描述项
 */
export type WidgetEventItem = {
  /** 组类型 */
  groupType: string;
  /** 显示菜单名称 */
  menuTitle: string;
  type: string;
};

export type WidgetEventGroupItem = {
  type: string;
  /** 显示菜单名称 */
  menuTitle: string;
  /** 父组的类型 */
  parentGroupType?: string;
};

type WidgetBase<T extends string> = {
  /** 唯一标识 */
  id: string;
  /** 部件类型 */
  type: T;
  /** 分组类型 */
  groupType: string;
  /** 代码组件名称 */
  elementType: string;
  /** 名称 */
  name: string;
  /** 标签 */
  tags: string[];
  /** 默认静态配置 */
  defaultStyles?: StaticProps;
  /** 表单配置 */
  settingsForm?: SettingConfig[];
  /** 支持的事件列表 */
  supportEvents?: WidgetEventType[];
};

type WidgetEventType = string; // 为事件名称添加别名

export type ComponentWidget = WidgetBase<"component">;

export type GroupWidget = WidgetBase<"group">;

export type SearchParams = {
  "/apps": {
    isTemplate: string;
  };
  "/apps/:id/design": {
    contentType: "design" | "blueMap";
    selectedEvent: string;
  };
};

export type AppGroup = {
  id: number;
  menuTitle: string;
  parentGroupId?: number;
};

export type AppData = {
  id: number;
  menuTitle: string;
  groupId?: number;
  // 是否收藏
  ifFavorite?: boolean
};

export type TemplateUseCase = {
  id: number;
  title: string;
  type:
    | "crm"
    | "erp"
    | "hrm"
    | "form"
    | "e-commerce"
    | "project-management"
    | "finance";
};

export type Template = {
  id: number;
  title: string;
  previewImgSrc: string;
  type: "mobile" | "tablet" | "desktop";
  /** 场景 */
  useCasId: number;
};

import { Cell, Graph, Node } from "@antv/x6";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { DataNode } from "antd/es/tree";

export interface BlueMapPortMeta {
  blueMapPortConfig: BlueMapPortConfig;
  portBlueMapAttrs: PortBlueMapAttrs;
}

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

export type MenuGroupType = "flow-control" | "event";

export interface BlueMapNodeConfig<
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"],
> {
  /** 用于在所有 node config 中检索 */
  id: string;
  shapeName: string;
  /**
   * flowControl - 控制流节点
   * function - 函数调用节点
   */
  type: "flowControl" | "function" | "event";
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
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"],
> = {
  id: string;
  shapeName: string;
  shape: ReactShapeConfig;
  ports?: Node.Defaults["ports"];
  attrs?: Attrs;
};

export type PortConfig = {
  id: string;
  component: React.FC<PortComponentProps>;
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

export type PortComponentProps = {
  node: Node;
  port: PortManager.Port;
  graph: Graph;
};

export type BlueMapPortComponentProps = PortComponentProps & {
  blueMapPort: {
    config: BlueMapPortConfig;
    args?: BlueMapPortCommonArgs;
  };
};
