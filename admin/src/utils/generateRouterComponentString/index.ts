import { NodeData, RouteNodeData } from "@/types";

export const generateRouterComponentString = (nodeData: NodeData[]): string => {
  const generateComponent = (node: NodeData): string => {
    if (node.elementType === "Route") {
      return generateRouteComponent(node as RouteNodeData);
    }
    const { elementType, staticProps, children } = node;
    const propsString = JSON.stringify(staticProps).replace(
      /"([^"]+)":/g,
      "$1:"
    );
    const childrenString = generateChildrenString(children);
    return `<${elementType} ${propsString}>${childrenString}</${elementType}>`;
  };

  const generateChildrenString = (
    children?: NodeData[] | { [slot: string]: NodeData }
  ): string => {
    if (!children) return "";
    if (Array.isArray(children)) {
      return children.map((child) => generateComponent(child)).join("");
    } else {
      return Object.values(children)
        .map((child) => generateComponent(child))
        .join("");
    }
  };

  const generateRouteComponent = (node: RouteNodeData): string => {
    const { path, element, children } = node;
    const childrenString = children
      ? children.map((child) => generateRouteComponent(child)).join("")
      : "";
    return `<Route path="${path}" element={${element}}>${childrenString}</Route>`;
  };

  const rootComponents = nodeData
    .map((node) => generateComponent(node))
    .join("");
  return `<Router initialEntries={["/about"]}><Routes>${rootComponents}</Routes></Router>`;
};
