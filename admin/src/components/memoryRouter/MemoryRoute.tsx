import React from "react";
import { MemoryRouteContext, useMemoryRoute } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { matchPath } from "react-router-dom";

export interface RouteProps {
  path?: string;
  children?: React.ReactNode;
}

export const MemoryRoute: React.FC<RouteProps> = ({ path = "", children }) => {
  const context = useMemoryRoute();
  const { location } = useMemoryRouter();

  let fullPath = path;

  if (context) {
    if (path.startsWith("/")) {
      // 如果是绝对路径，必须以 context.path 开始
      if (!path.startsWith(context.path)) {
        console.warn(`路径 "${path}" 不合法，必须以 "${context.path}" 开始`);
      }
      fullPath = path; // 绝对路径直接使用
    } else {
      // 相对路径拼接
      fullPath = `${context.path}/${path}`.replace(/\/+/g, "/");
    }
  }

  return (
    <MemoryRouteContext.Provider value={{ path: fullPath }}>
      {matchPath(fullPath, location) ? children : null}
    </MemoryRouteContext.Provider>
  );
};
