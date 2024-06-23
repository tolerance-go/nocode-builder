import { SettingConfig } from "@/components/SettingsForm";
import { DeepReadonly } from "@/utils/types";

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
  "/apps/:id/design": {
    contentType: "design" | "blueMap";
    selectedEvent: string;
  };
};
