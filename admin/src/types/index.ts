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
  type: T;
  /** 代码组件名称 */
  elementType: string;
  /** 名称 */
  name: string;
  /** 类别 */
  categories: string[];
};

export type ComponentWidget = WidgetBase<"component">;

export type GroupWidget = WidgetBase<"group">;
