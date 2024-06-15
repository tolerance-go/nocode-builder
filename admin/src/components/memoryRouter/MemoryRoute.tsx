import React from "react";
import { matchPath } from "react-router-dom";
import { MemoryRouteContext, useMemoryRoute } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";

export interface RouteProps {
  path: string;
  children?: React.ReactNode;
}

export const MemoryRoute: React.FC<RouteProps> = ({ path, children }) => {
  const context = useMemoryRoute();
  const { location } = useMemoryRouter();

  const fullPath = context
    ? `${context.path}/${path}`.replace(/\/+/g, "/")
    : path;

  return (
    <MemoryRouteContext.Provider value={{ path: fullPath }}>
      {/* 这里在结尾加 * 只是为了舞台编辑时候更加方便 */}
      {matchPath(`${fullPath}/*`.replace(/\/+/g, "/"), location)
        ? children
        : null}
    </MemoryRouteContext.Provider>
  );
};
