import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { MemoryRoutesContext } from "./MemoryRoutesContext";
import { MemoryRoute, RouteProps } from "./MemoryRoute";

interface RoutesProps {
  children?: React.ReactNode;
}

// 收集和渲染路由数据
const processRoutes = (
  routes: React.ReactNode,
  parentPath: string = "",
  location: string
): React.ReactNode | null => {
  return React.Children.map(routes, (route) => {
    if (!React.isValidElement(route)) {
      return route;
    }

    if (route.type !== MemoryRoute) {
      // throw new Error(
      //   `[${
      //     (route.type as React.JSXElementConstructor<unknown>).name
      //   }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      // );
      return React.cloneElement(route, {
        children: processRoutes(route.props.children, parentPath, location),
      } as React.Attributes);
    }

    const { path = "", element, children } = route.props as RouteProps;
    const fullPath = `${parentPath}/${path}`.replace(/\/\//g, "/");

    if (location.startsWith(fullPath)) {
      if (location === fullPath) {
        return (
          // 这个 Provider 十分重要，否则元素可能拿到父组件的 context 导致死循环
          // 明确告诉它，它的 outlet 是空
          <MemoryRouteContext.Provider
            value={{
              outlet: null,
            }}
          >
            {element}
          </MemoryRouteContext.Provider>
        );
      }

      return (
        <MemoryRouteContext.Provider
          value={{
            outlet: processRoutes(children, fullPath, location),
          }}
        >
          {element}
        </MemoryRouteContext.Provider>
      );
    }
  });
};

export const MemoryRoutes: React.FC<RoutesProps> = ({ children }) => {
  const { location } = useMemoryRouter();

  return (
    <MemoryRoutesContext.Provider value={true}>
      {processRoutes(children, "", location)}
    </MemoryRoutesContext.Provider>
  );
};
