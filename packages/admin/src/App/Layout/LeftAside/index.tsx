import { matchPath, useLocation } from "react-router-dom";
import { AppAside } from "./AppAside";
import { DesignAside } from "./DesignAside";

export const LeftAside = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col h-[100%]">
      {matchPath("/apps", location.pathname) && <AppAside />}
      {matchPath("/apps/:id/design", location.pathname) && <DesignAside />}
    </div>
  );
};
