import { matchPath, useLocation } from "react-router-dom";
import { AppAside } from "./AppAside";
import { DesignAside } from "./DesignAside";

export const LeftAside = () => {
  const location = useLocation();

  const render = () => {
    if (matchPath("/apps", location.pathname)) {
      return <AppAside />;
    }

    if (matchPath("/apps/:id/design", location.pathname)) {
      return <DesignAside />;
    }
  };

  return <div className="flex flex-col bg-white h-[100%]">{render()}</div>;
};
