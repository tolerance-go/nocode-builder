import { matchPath, useLocation } from "react-router-dom";
import { AppContent } from "./AppContent";
import { DataTable } from "./DataTable";
import { DesignArea } from "./DesignArea";

export const Content = () => {
  const location = useLocation();

  if (matchPath("/apps/:id?", location.pathname)) {
    return <AppContent />;
  }
  if (matchPath("/apps/:id/data", location.pathname)) {
    return <DataTable />;
  }
  if (matchPath("/apps/:id/design", location.pathname)) {
    return <DesignArea />;
  }
  return null;
};
