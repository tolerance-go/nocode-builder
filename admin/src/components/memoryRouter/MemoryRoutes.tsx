import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { MemoryRoutesContext } from "./MemoryRoutesContext";
import { MemoryRoute } from "./MemoryRoute";

interface RouteProps {
  children?: React.ReactNode;
}

export const MemoryRoutes: React.FC<RouteProps> = ({ children }) => {
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
          `[Error: [${route}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
        );
      }

      const { path, element } = route.props;
      const fullPath = `${parentPath}/${path}`.replace(/\/\//g, "/");

      if (location.startsWith(fullPath)) {
        console.log("location", location, "fullPath", fullPath);
        if (location === fullPath) {
          return element;
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

      return null;
    });
  };

  return (
    <MemoryRoutesContext.Provider value={true}>
      {renderRoutes(children, "")}
    </MemoryRoutesContext.Provider>
  );
};
