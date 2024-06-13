import { SettingConfig } from "@/components/SettingsForm";
import { DeepReadonly } from "@/utils/types";
export type DesignAsideType = "store" | "settings";

export type StaticPropsValue = string | number | boolean | null | undefined;
export type StaticPropsArrayValue = StaticPropsValue[];

export type StaticProps = {
  [key: string]: StaticPropsValue | StaticPropsArrayValue | StaticProps;
};

export type NodePlainChild = string | number | boolean | null | undefined;

export type SlotsChildren = {
  [key: string]: NodeData[] | NodeData | NodePlainChild;
};

export type NodeData = {
  id: string;
  elementType: string;
  children?: SlotsChildren | NodeData[] | NodePlainChild;
  staticProps: StaticProps;
  /**
   * 从哪个 widget 创建
   */
  fromWidgetId: string;
  /** 表单配置数据 */
  settings: StaticProps;
};

export type DesignableComponentProps<
  Children = React.ReactNode | Record<string, React.ReactNode>
> = {
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
  onClick: React.MouseEventHandler;
  children?: Children;
  node: DeepReadonly<NodeData>;
  ["data-node-id"]: string;
};

export type ComponentType =
  | React.FC<DesignableComponentProps<React.ReactNode>>
  | React.FC<DesignableComponentProps<Record<string, React.ReactNode>>>
  | string;

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
  defaultStaticProps?: StaticProps;
  /** 表单配置 */
  settingsForm?: SettingConfig[];
};

export type ComponentWidget = WidgetBase<"component">;

export type GroupWidget = WidgetBase<"group">;
