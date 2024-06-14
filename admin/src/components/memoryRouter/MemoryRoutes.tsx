import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";
import { MemoryRoutesContext } from "./MemoryRoutesContext";

interface RouteProps {
  children?: React.ReactNode;
}

export const MemoryRoutes: React.FC<RouteProps> = ({ children }) => {
  const { location } = useMemoryRouter();

  const renderRoutes = (
    routes: React.ReactNode,
    parentPath: string
  ): React.ReactNode => {
    let matchedElement: React.ReactNode = null;

    React.Children.forEach(routes, (child) => {
      if (!React.isValidElement(child)) {
        throw new Error(
          `[Error: [${child}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>]`
        );
      }

      const { path = "", element } = child.props;
      const fullPath = `${parentPath}/${path}`.replace(/\/+/g, "/");

      if (location === fullPath) {
        matchedElement = element;
      }

      if (child.props.children) {
        const childRoutes = renderRoutes(child.props.children, fullPath);
        if (childRoutes) {
          matchedElement = React.cloneElement(element, {
            children: (
              <MemoryRouteContext.Provider value={{ outlet: childRoutes }}>
                {childRoutes}
              </MemoryRouteContext.Provider>
            ),
          });
        }
      }
    });

    return matchedElement;
  };

  const matchedElement = renderRoutes(children, "");

  return (
    <MemoryRoutesContext.Provider value={true}>
      {matchedElement}
    </MemoryRoutesContext.Provider>
  );
};
