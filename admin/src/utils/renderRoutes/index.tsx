import { Route, Routes } from "react-router-dom";
import { NodeData, RouteComponentData } from "@/types";

export const renderRoutes = (
  data: RouteComponentData[],
  renderElement: (nodeData: NodeData["children"]) => React.ReactNode
) => {
  const convertRoute = (routeData: RouteComponentData) => {
    const { path, element, children } = routeData;

    return (
      <Route key={path} path={path} element={renderElement(element)}>
        {children && children.map(convertRoute)}
      </Route>
    );
  };

  return <Routes>{data.map(convertRoute)}</Routes>;
};
