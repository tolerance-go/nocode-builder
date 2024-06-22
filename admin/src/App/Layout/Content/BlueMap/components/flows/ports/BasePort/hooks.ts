import { createContext } from "react";

export const BasePortContext = createContext<{
  datasets?: object;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode;
} | null>(null);
