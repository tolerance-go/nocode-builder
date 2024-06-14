import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { MemoryRoutesContext } from "./MemoryRoutesContext";
import { MemoryRoute, RouteProps } from "./MemoryRoute";

interface RoutesProps {
  children?: React.ReactNode;
}

export const MemoryRoutes: React.FC<RoutesProps> = ({ children }) => {
  const { location } = useMemoryRouter();

  const renderRoutes = (
    routes: React.ReactNode,
    parentPath: string
  ): React.ReactNode => {
    return React.Children.map(routes, (route) => {
      if (!React.isValidElement(route)) {
        return null;
      }

      if (route.type !== MemoryRoute) {
        throw new Error(
          `[Error: [${route.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
        );
      }

      const { path = "", element } = route.props as RouteProps;

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
              outlet: renderRoutes(route.props.children, fullPath),
            }}
          >
            {element}
          </MemoryRouteContext.Provider>
        );
      }
    });
  };

  return (
    <MemoryRoutesContext.Provider value={true}>
      {renderRoutes(children, "")}
    </MemoryRoutesContext.Provider>
  );
};
