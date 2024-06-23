import { matchPath, useLocation } from "react-router-dom";
import { AppList } from "./AppList";
import { DataTable } from "./DataTable";
import { DesignArea } from "./DesignArea";

export const Content = () => {
  const location = useLocation();

  if (matchPath("/apps", location.pathname)) {
    return <AppList />;
  }
  if (matchPath("/apps/:id/data", location.pathname)) {
    return <DataTable />;
  }
  if (matchPath("/apps/:id/design", location.pathname)) {
    return <DesignArea />;
  }
  return null;
};
