import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { MemoryRoutesContext } from "./MemoryRoutesContext";
import { MemoryRoute, RouteProps } from "./MemoryRoute";

interface RoutesProps {
  children?: React.ReactNode;
}

interface RouteData {
  path: string;
  element: React.ReactNode;
  children?: RouteData[];
}

// 收集所有的路由数据
const collectRoutes = (
  routes: React.ReactNode,
  parentPath: string = ""
): RouteData[] => {
  return React.Children.toArray(routes).reduce<RouteData[]>((acc, route) => {
    if (!React.isValidElement(route)) {
      return acc;
    }

    if (typeof route.type !== "string" && route.type !== MemoryRoute) {
      throw new Error(
        `[${
          (route.type as React.JSXElementConstructor<unknown>).name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      );
    }

    const { path = "", element, children } = route.props as RouteProps;
    const fullPath = `${parentPath}/${path}`.replace(/\/\//g, "/");

    acc.push({
      path: fullPath,
      element,
      children: collectRoutes(children, fullPath),
    });

    return acc;
  }, []);
};

// 渲染路由
const renderRoutes = (
  routes: RouteData[],
  location: string
): React.ReactNode => {
  for (const route of routes) {
    if (location.startsWith(route.path)) {
      if (location === route.path) {
        return (
          // 这个 Provider 十分重要，否则元素可能拿到父组件的 context 导致死循环
          // 明确告诉它，它的 outlet 是空
          <MemoryRouteContext.Provider
            value={{
              outlet: null,
            }}
          >
            {route.element}
          </MemoryRouteContext.Provider>
        );
      }

      return (
        <MemoryRouteContext.Provider
          value={{
            outlet: renderRoutes(route.children || [], location),
          }}
        >
          {route.element}
        </MemoryRouteContext.Provider>
      );
    }
  }

  return null;
};

export const MemoryRoutes: React.FC<RoutesProps> = ({ children }) => {
  const { location } = useMemoryRouter();
  const routesData = React.useMemo(() => collectRoutes(children), [children]);

  return (
    <MemoryRoutesContext.Provider value={true}>
      {renderRoutes(routesData, location)}
    </MemoryRoutesContext.Provider>
  );
};
