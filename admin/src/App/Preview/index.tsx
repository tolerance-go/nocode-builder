import store from "@/stores";
import { RouteNodeData } from "@/types";
import { generateRouteComponents } from "@/utils/generateRouteComponents";
import { renderNodes } from "@/utils/renderNodes";
import { renderRoutes } from "@/utils/renderRoutes";
import { BrowserRouter } from "react-router-dom";
import { useSnapshot } from "valtio";

export const Preview = () => {
  const designTreeData = useSnapshot(store.designs.states.designTreeData);

  return (
    <BrowserRouter basename="/preview">
      {renderNodes(
        designTreeData.value.nodeData,
        (routeNodeData: RouteNodeData) => {
          return renderRoutes(
            generateRouteComponents([routeNodeData]),
            (element) => {
              return renderNodes(element, () => {
                throw new Error("不应该出现 Route 节点。");
              });
            }
          );
        }
      )}
    </BrowserRouter>
  );
};
