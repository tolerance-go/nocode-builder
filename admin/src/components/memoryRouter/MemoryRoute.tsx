import React, { useContext } from "react";
import { MemoryRoutesContext } from "./MemoryRoutesContext";

export interface RouteProps {
  path?: string;
  element?: React.ReactNode;
  children?: React.ReactNode;
}

export const MemoryRoute: React.FC<RouteProps> = ({ children }) => {
  const context = useContext(MemoryRoutesContext);

  if (!context) {
    throw new Error(
      "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
    );
  }

  return children;
};
