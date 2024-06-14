import { RouteNode } from "@/types";
import { proxy } from "valtio";

/** 舞台内存路由数据 */
const stageMemoryRouter = proxy({
  entries: ["/"] as string[],
  index: 0,
  get location() {
    return this.entries[this.index];
  },
});

const routeNodes = proxy({
  nodes: [] as RouteNode[],
});

export const states = proxy({
  routeNodes,
  stageMemoryRouter,
});

export const actions = {
  updateStageMemoryRouterEntries(entries: string[]) {
    states.stageMemoryRouter.entries = entries;
  },
  updateStageMemoryRouterIndex(index: number) {
    states.stageMemoryRouter.index = index;
  },

  /**
   * 获取完整 path 路径
   *
   * 传入 routeNode 的 id，找到他，拼接上所有父级的 path 然后返回
   * path 已经是 '/' 分割的了，而且根才是 以 / 开头，子节点都是相对的
   */
  getNodeFullPath(id: string): string | null {
    const findNodePath = (
      nodes: RouteNode[],
      id: string,
      path: string[] = []
    ): string[] | null => {
      for (const node of nodes) {
        const currentPath = [...path, node.path];
        if (node.id === id) return currentPath;
        if (node.children) {
          const foundPath = findNodePath(node.children, id, currentPath);
          if (foundPath) return foundPath;
        }
      }
      return null;
    };

    const path = findNodePath(states.routeNodes.nodes, id);
    if (path?.length) {
      const after = path.slice(1).join("/");
      return `${path[0]}${after && path[0] !== "/" ? "/" : ""}${after}`;
    }
    return null;
  },

  addNode(parentId: string | null, newNode: RouteNode) {
    const findNode = (nodes: RouteNode[], id: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    if (parentId === null) {
      states.routeNodes.nodes.push(newNode);
    } else {
      const parentNode = findNode(states.routeNodes.nodes, parentId);
      if (parentNode) {
        parentNode.children = parentNode.children ?? [];
        parentNode.children.push(newNode);
      }
    }
  },

  deleteNode(id: string) {
    const deleteNodeHelper = (nodes: RouteNode[], id: string): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          nodes.splice(i, 1);
          return true;
        }
        if (nodes[i].children) {
          const deleted = deleteNodeHelper(nodes[i].children!, id);
          if (deleted) return true;
        }
      }
      return false;
    };

    deleteNodeHelper(states.routeNodes.nodes, id);
  },

  updateNode(id: string, updatedNode: Partial<RouteNode>) {
    const findNode = (nodes: RouteNode[], id: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(states.routeNodes.nodes, id);
    if (node) {
      Object.assign(node, updatedNode);
    }
  },

  moveNode(id: string, newParentId: string | null) {
    const findNode = (nodes: RouteNode[], id: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const removeNode = (nodes: RouteNode[], id: string): RouteNode | null => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          return nodes.splice(i, 1)[0];
        }
        if (nodes[i].children) {
          const removedNode = removeNode(nodes[i].children!, id);
          if (removedNode) return removedNode;
        }
      }
      return null;
    };

    const node = removeNode(states.routeNodes.nodes, id);
    if (node) {
      if (newParentId === null) {
        states.routeNodes.nodes.push(node);
      } else {
        const parentNode = findNode(states.routeNodes.nodes, newParentId);
        if (parentNode) {
          parentNode.children = parentNode.children ?? [];
          parentNode.children.push(node);
        }
      }
    }
  },

  getNode(id: string): RouteNode | null {
    const findNode = (nodes: RouteNode[], id: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    return findNode(states.routeNodes.nodes, id);
  },
};
