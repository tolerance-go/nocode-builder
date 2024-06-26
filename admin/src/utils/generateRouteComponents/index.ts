import {
  NodeData,
  RouteComponentData,
  RouteNodeData,
  SlotsChildren,
} from "@/types";
import { isPlainObject } from "../isPlainObject";

function generateRouteComponents(
  nodeDatas: RouteNodeData[]
): RouteComponentData[] {
  function replaceRoutesWithOutlet<T extends NodeData[] | SlotsChildren>(
    children: T,
    parentId: string
  ): T extends NodeData[] ? NodeData[] : SlotsChildren {
    if (Array.isArray(children)) {
      const newChildren: NodeData[] = [];
      let i = 0;
      while (i < children.length) {
        if (
          children[i].elementType === "Route" &&
          i < children.length - 1 &&
          children[i + 1].elementType === "Route"
        ) {
          // 如果发现了紧邻的 Route 节点，将它们一起替换为 Outlet
          newChildren.push({
            styles: {},
            fromWidgetId: "",
            settings: {},
            elementType: "Outlet",
            id: `${parentId}_outlet`, // 设置 Outlet 的 id
            children: [], // Outlet 没有子节点
          });
          i += 2; // 跳过紧邻的 Route 节点
        } else {
          newChildren.push(
            children[i].children
              ? {
                  ...children[i],
                  children: replaceRoutesWithOutlet(
                    children[i].children || [],
                    children[i].id
                  ),
                }
              : children[i]
          );
          i++;
        }
      }
      return newChildren as T extends NodeData[] ? NodeData[] : SlotsChildren;
    }

    return Object.fromEntries(
      Object.entries(children).map(([key, childArray]) => {
        return [key, replaceRoutesWithOutlet(childArray, parentId)];
      })
    ) as T extends NodeData[] ? NodeData[] : SlotsChildren;
  }

  /**
   * 这个函数检查数据合法性
   * 他遍历所有分支，直到最后或者遇到 elementType 为 Route 的时候停止
   * 遍历完成后，把遇到的所有 Route 整理起来进行判断，
   * 如果 Route 存在，并且所有 Route 都是紧邻的兄弟节点表示数据合法
   * @param nodeChildren
   */
  const validateAndCollectRoutes = (
    nodeChildren: NodeData["children"],
    parentNode: NodeData | null
  ) => {
    const routes: {
      node: RouteNodeData;
      parent: NodeData | null;
      slot?: string;
    }[] = [];

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
        Object.entries(children).forEach(([slot, childArray]) => {
          console.log(slot);
          if (Array.isArray(childArray)) {
            childArray.forEach((child: NodeData) => {
              if (child.elementType === "Route") {
                routes.push({ node: child as RouteNodeData, parent, slot });
              } else if (child.children) {
                collectRoutes(child.children, child);
              }
            });
          }
        });
      }
    }

    collectRoutes(nodeChildren, parentNode);

    if (routes.length > 1) {
      const uniqueParents = new Set(
        routes.map((route) => `${route.parent?.id}${route.slot}`)
      );
      if (uniqueParents.size > 1) {
        throw new Error("结构无效：Route 节点不是兄弟节点。");
      }

      // 检查 Route 节点是否是紧邻的兄弟节点
      const parent = routes[0].parent;
      const slot = routes[0].slot;

      if (parent) {
        const parentChildren = slot
          ? (parent.children as SlotsChildren)[slot]
          : Array.isArray(parent.children)
          ? parent.children
          : [];

        if (!Array.isArray(parentChildren)) {
          throw new Error("结构无效：父节点的子节点应为数组。");
        }

        const routeIndexes = routes.map((route) =>
          parentChildren.findIndex((child) => child.id === route.node.id)
        );

        routeIndexes.sort((a, b) => a - b);

        for (let i = 1; i < routeIndexes.length; i++) {
          if (routeIndexes[i] !== routeIndexes[i - 1] + 1) {
            throw new Error("结构无效：Route 节点不是紧邻的。");
          }
        }
      }
    }

    return routes;
  };

  /** 他处理 Route 类型的节点数据，然后进行包装后返回 */
  const processRouteNode = (
    routeNodeData: RouteNodeData
  ): RouteComponentData => {
    const routes = validateAndCollectRoutes(
      routeNodeData.children,
      routeNodeData
    );

    return {
      type: "Route",
      path: routeNodeData.settings.path as string,
      element: replaceRoutesWithOutlet(
        routeNodeData.children ?? [],
        routeNodeData.id
      ),
      children: routes.map((route) => processRouteNode(route.node)),
    };
  };

  function traverseNodes(nodes: RouteNodeData[]): RouteComponentData[] {
    return nodes.map((node) => {
      if (node.elementType === "Route") {
        return processRouteNode(node);
      }

      throw new Error("节点不是 Route 类型。");
    });
  }

  // 你可以在这里调用 traverseNodes 方法，进行节点遍历
  return traverseNodes(nodeDatas);
}

export { generateRouteComponents };
