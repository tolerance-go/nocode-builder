export type NavItem = {
  key: string;
  label: string;
  items?: NavItem[];
};

export type VisualPosition = "top" | "bottom" | "left" | "right";
export type DocumentInsertionPosition = "before" | "after" | "not-allowed";
