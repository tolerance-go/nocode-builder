import { NodeData } from "@/stores/designs";
import { DeepReadonly } from "@/utils/types";

export type DesignableComponentProps = {
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
  children?: React.ReactNode | Record<string, React.ReactNode>;
  node: DeepReadonly<NodeData>;
  ["data-node-id"]: string;
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

type WidgetBase<T extends string> = {
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
};

export type ComponentWidget = WidgetBase<"component">;

export type GroupWidget = WidgetBase<"group">;
