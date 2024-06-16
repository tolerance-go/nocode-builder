import { matchPath, useLocation } from "react-router-dom";
import { AppList } from "./AppList";
import { DataTable } from "./DataTable";
import { Designer } from "./Designer";
import BlueMap from "./BlueMap";

export const Content = () => {
  const location = useLocation();

  if (matchPath("/apps", location.pathname)) {
    return <AppList />;
  }
  if (matchPath("/apps/:id/data", location.pathname)) {
    return <DataTable />;
  }
  if (matchPath("/apps/:id/design", location.pathname)) {
    return <Designer />;
  }
  if (matchPath("/apps/:id/blue-map", location.pathname)) {
    return <BlueMap />;
  }
  return null;
};
