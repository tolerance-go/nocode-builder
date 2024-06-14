import React from "react";
import { MemoryRouteContext } from "./MemoryRouteContext";
import { useMemoryRouter } from "./useMemoryRouter";

interface RouteProps {
  path: string;
  element: React.ReactNode;
  children?: React.ReactNode;
}

export const MemoryRoute: React.FC<RouteProps> = ({
  path,
  element,
  children,
}) => {
  const { location } = useMemoryRouter();
  let outlet = null;

  const matchRoute = (currentPath: string, targetPath: string): boolean => {
    if (currentPath === targetPath) return true;
    let matched = false;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const childPath = `${path}${child.props.path}`;
          if (currentPath === childPath) {
            matched = true;
            outlet = child.props.element;
          }
        }
      });
    }
    return matched;
  };

  const isMatched = matchRoute(location, path);

  return isMatched ? (
    <MemoryRouteContext.Provider value={{ outlet }}>
      {element}
    </MemoryRouteContext.Provider>
  ) : null;
};
