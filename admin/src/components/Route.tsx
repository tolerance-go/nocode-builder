import { matchPath } from "@/utils/matchPath";
import React, { useEffect, useState, ReactNode } from "react";

interface RouteProps {
  path: string;
  element?: ReactNode;
  children?: ReactNode;
}

const Route: React.FC<RouteProps> = ({ path, element, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  if (matchPath(path, currentPath)) {
    return (
      <>
        {element}
        {children}
      </>
    );
  }

  return null;
};

export default Route;
