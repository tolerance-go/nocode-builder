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
