import {
  NodeData,
  NodePlainChild,
  RouteNodeData,
  SlotsChildren,
} from "@/types";
import { isPlainObject } from "../isPlainObject";

interface RouteComponentData {
  type: "Route";
  path: string;
  element: NodeData["children"];
  children?: RouteComponentData[];
}

function generateRouterComponent(nodeDatas: NodeData[]): RouteComponentData[] {

  function replaceRoutesWithOutlet(
    children: NodeData["children"]
  ): NodeData["children"] {
    if (Array.isArray(children)) {
      return children.map((child) => {
        if (child.elementType === "Route") {
          return {
            ...child,
            elementType: "Outlet",
            children: [], // Outlet 没有子节点
          };
        } else if (child.children) {
          return {
            ...child,
            children: replaceRoutesWithOutlet(child.children),
          };
        }
        return child;
      });
    } else if (isPlainObject(children)) {
      const newChildren: SlotsChildren = {};
      Object.entries(children).forEach(([key, childArray]) => {
        if (Array.isArray(childArray)) {
          newChildren[key] = childArray.map((child) => {
            if (child.elementType === "Route") {
              return {
                ...child,
                elementType: "Outlet",
                children: [], // Outlet 没有子节点
              };
            } else if (child.children) {
              return {
                ...child,
                children: replaceRoutesWithOutlet(child.children),
              };
            }
            return child;
          });
        } else {
          newChildren[key] = childArray;
        }
      });
      return newChildren;
    }
    return children;
  }

  /**
   * 这个函数检查数据合法性
   * 他遍历所有分支，直到最后或者遇到 elementType 为 Route 的时候停止
   * 遍历完成后，把遇到的所有 Route 整理起来进行判断，
   * 如果 Route 存在，并且所有 Route 都是兄弟节点表示数据合法
   * @param nodeChildren
   */
  const validateAndCollectRoutes = (
    nodeChildren: NodeData["children"],
    parentNode: NodeData | null
  ) => {
    const routes: { node: RouteNodeData; parent: NodeData | null }[] = [];

    function collectRoutes(
      children: NodeData["children"],
      parent: NodeData | null
    ) {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child.elementType === "Route") {
            routes.push({ node: child as RouteNodeData, parent });
          } else if (child.children) {
            collectRoutes(child.children, child);
          }
        });
      } else if (isPlainObject(children)) {
        Object.values(children).forEach(
          (childArray: NodeData[] | NodePlainChild) => {
            if (Array.isArray(childArray)) {
              childArray.forEach((child: NodeData) => {
                if (child.elementType === "Route") {
                  routes.push({ node: child as RouteNodeData, parent });
                } else if (child.children) {
                  collectRoutes(child.children, child);
                }
              });
            }
          }
        );
      }
    }

    collectRoutes(nodeChildren, parentNode);

    if (routes.length > 1) {
      const uniqueParents = new Set(routes.map((route) => route.parent?.id));
      if (uniqueParents.size > 1) {
        throw new Error("Invalid structure: Routes are not sibling nodes.");
      }
    }

    return routes;
  };

  /** 他处理 Route 类型的节点数据，然后进行包装后返回 */
  const xxx = (routeNodeData: RouteNodeData): RouteComponentData => {
    const routes = validateAndCollectRoutes(
      routeNodeData.children,
      routeNodeData
    );

    return {
      type: "Route",
      path: routeNodeData.settings.path as string,
      element: replaceRoutesWithOutlet(routeNodeData.children),
      children: routes.map((route) => xxx(route.node)),
    };
  };

  function traverseNodes(nodes: NodeData[]): (NodeData | RouteComponentData)[] {
    return nodes.map((node) => {
      if (node.elementType === "Route") {
        return xxx(node as RouteNodeData);
      }
      return {
        ...node,
        children: Array.isArray(node.children)
          ? traverseNodes(node.children)
          : Object.fromEntries(
              Object.entries(node.children || {}).map(([key, value]) => [
                key,
                traverseNodes(value),
              ])
            ),
      };
    });
  }

  // 你可以在这里调用 traverseNodes 方法，进行节点遍历
  return traverseNodes(nodeDatas);
}

export { generateRouterComponent };
