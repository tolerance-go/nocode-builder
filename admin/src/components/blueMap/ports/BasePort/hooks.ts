import { MenuProps } from "antd";
import { createContext } from "react";

export const BasePortContext = createContext<{
  datasets?: object;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode;
  menuItems?: MenuProps["items"];
} | null>(null);
