import { NodeData, RouteNodeData, SlotsChildren } from "@/types";

interface RouterComponent {
  type: string;
  children: any;
}

export function generateRouterComponent(
  nodeDatas: NodeData[]
): RouterComponent {
  function generateRoute(node: NodeData): any {
    const { elementType, settings, children } = node as RouteNodeData;
    const route: any = {
      type: elementType,
      path: settings?.path,
      element: generateElement(node),
    };

    if (children) {
      const routeChildren = generateRouteChildren(children);
      if (routeChildren.length > 0) {
        route.children = routeChildren;
      }
    }

    return route;
  }

  function generateElement(node: NodeData): any {
    const { id, elementType, staticProps, fromWidgetId, children } = node;

    if (Array.isArray(children)) {
      return children.map(generateElement);
    }

    if (typeof children === "object" && children !== null) {
      const slots: any = {};
      for (const key in children) {
        if (Array.isArray(children[key])) {
          slots[key] = children[key].map(generateElement);
        } else {
          slots[key] = generateElement(children[key] as NodeData);
        }
      }
      return {
        id,
        elementType,
        staticProps,
        fromWidgetId,
        children: slots,
      };
    }

    return {
      id,
      elementType,
      staticProps,
      fromWidgetId,
      children: children || [],
    };
  }

  function generateRouteChildren(children: SlotsChildren | NodeData[]): any[] {
    if (Array.isArray(children)) {
      return children.map((child) => {
        if ((child as RouteNodeData).elementType === "Route") {
          return generateRoute(child as RouteNodeData);
        }
        return generateElement(child);
      });
    }

    if (typeof children === "object" && children !== null) {
      const routes: any[] = [];
      for (const key in children) {
        if (Array.isArray(children[key])) {
          routes.push(
            ...children[key].map((child) => {
              if ((child as RouteNodeData).elementType === "Route") {
                return generateRoute(child as RouteNodeData);
              }
              return generateElement(child);
            })
          );
        } else {
          const child = children[key] as NodeData;
          if (child.elementType === "Route") {
            routes.push(generateRoute(child as RouteNodeData));
          } else {
            routes.push(generateElement(child));
          }
        }
      }
      return routes;
    }

    return [];
  }

  return {
    type: "Router",
    children: {
      type: "Routes",
      children: nodeDatas.map(generateRoute),
    },
  };
}
