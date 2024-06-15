import { NodeData, SlotsChildren } from "@/types";

interface RouteComponent {
  type: "Router" | "Routes" | "Route";
  path?: string;
  element?: RouteComponent[];
  children?: RouteComponent[];
}

function generateRouterComponent(nodeDatas: NodeData[]): RouteComponent {
  function transformNode(node: NodeData): RouteComponent {
    if (node.elementType === "Route") {
      const route: RouteComponent = {
        type: "Route",
        path: node.settings.path as string,
        element: [],
      };

      if (node.children && Array.isArray(node.children)) {
        route.element = node.children.map(
          transformNode as (child: NodeData) => RouteComponent
        );
      } else if (node.children && typeof node.children === "object") {
        const slotChildren = node.children as SlotsChildren;
        route.element = [
          {
            ...node,
            children: Object.fromEntries(
              Object.entries(slotChildren).map(([slot, children]) => [
                slot,
                Array.isArray(children)
                  ? children.map((child: NodeData) =>
                      child.elementType === "Route"
                        ? { ...child, children: [] }
                        : transformNode(child)
                    )
                  : transformNode(children as NodeData),
              ])
            ),
          } as unknown as RouteComponent,
        ];

        route.children = Object.values(slotChildren)
          .flat()
          .filter(
            (child): child is NodeData =>
              (child as NodeData).elementType === "Route"
          )
          .map((child: NodeData) => {
            return {
              type: "Route",
              path: child.settings.path as string,
              element: child.children
                ? Array.isArray(child.children)
                  ? child.children.map(
                      transformNode as (child: NodeData) => RouteComponent
                    )
                  : [transformNode(child)]
                : [],
            };
          });
      }
      return route;
    } else {
      return {
        type: node.elementType as "Router" | "Routes" | "Route",
        children: node.children
          ? (node.children as NodeData[]).map(transformNode)
          : [],
      };
    }
  }

  return {
    type: "Router",
    children: {
      type: "Routes",
      children: nodeDatas.map(transformNode),
    },
  };
}

export { generateRouterComponent };
