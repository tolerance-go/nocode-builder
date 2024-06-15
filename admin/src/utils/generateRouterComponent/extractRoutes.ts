import { NodeData } from "@/types";

interface RouteNode {
  id: string;
  path: string;
  elementType: string;
  staticProps: object;
  fromWidgetId: string;
  settings: object;
  children?: RouteNode[];
}

function extractRoutes(nodeDatas: NodeData[]): RouteNode[] {
  function traverseNode(node: NodeData): RouteNode | RouteNode[] | null {
    // 处理当前节点是 Route 的情况
    if (node.elementType === "Route") {
      const routeNode: RouteNode = {
        id: node.id,
        path: node.settings.path as string,
        elementType: node.elementType,
        staticProps: node.staticProps,
        fromWidgetId: node.fromWidgetId,
        settings: node.settings,
        children: [],
      };

      // 递归处理子节点
      if (node.children && Array.isArray(node.children)) {
        routeNode.children = node.children
          .map(traverseNode)
          .flat()
          .filter((child): child is RouteNode => child !== null);
      } else if (node.children && typeof node.children === "object") {
        const slotChildren = node.children as { [key: string]: NodeData[] };
        routeNode.children = Object.values(slotChildren)
          .flat()
          .map(traverseNode)
          .flat()
          .filter((child): child is RouteNode => child !== null);
      }

      return routeNode;
    }

    // 递归处理非 Route 节点的子节点，查找 Route 节点
    if (node.children && Array.isArray(node.children)) {
      return node.children
        .map(traverseNode)
        .flat()
        .filter((child): child is RouteNode => child !== null);
    } else if (node.children && typeof node.children === "object") {
      const slotChildren = node.children as { [key: string]: NodeData[] };
      return Object.values(slotChildren)
        .flat()
        .map(traverseNode)
        .flat()
        .filter((child): child is RouteNode => child !== null);
    }

    return null;
  }

  return nodeDatas
    .map(traverseNode)
    .flat()
    .filter((route): route is RouteNode => route !== null);
}

export { extractRoutes };
