import { RouteNode } from "@/types";
import { proxy } from "valtio";

const routeNodes = proxy({
  nodes: [] as RouteNode[],
});

export const states = proxy({
  routeNodes,
});

export const actions = {
  addNode(parentPath: string | null, newNode: RouteNode) {
    const findNode = (nodes: RouteNode[], path: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
          const found = findNode(node.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    if (parentPath === null) {
      states.routeNodes.nodes.push(newNode);
    } else {
      const parentNode = findNode(states.routeNodes.nodes, parentPath);
      if (parentNode) {
        parentNode.children = parentNode.children ?? [];
        parentNode.children.push(newNode);
      }
    }
  },

  deleteNode(path: string) {
    const deleteNodeHelper = (nodes: RouteNode[], path: string): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].path === path) {
          nodes.splice(i, 1);
          return true;
        }
        if (nodes[i].children) {
          const deleted = deleteNodeHelper(nodes[i].children!, path);
          if (deleted) return true;
        }
      }
      return false;
    };

    deleteNodeHelper(states.routeNodes.nodes, path);
  },

  updateNode(path: string, updatedNode: Partial<RouteNode>) {
    const findNode = (nodes: RouteNode[], path: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
          const found = findNode(node.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNode(states.routeNodes.nodes, path);
    if (node) {
      Object.assign(node, updatedNode);
    }
  },

  moveNode(path: string, newParentPath: string | null) {
    const findNode = (nodes: RouteNode[], path: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
          const found = findNode(node.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const removeNode = (nodes: RouteNode[], path: string): RouteNode | null => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].path === path) {
          return nodes.splice(i, 1)[0];
        }
        if (nodes[i].children) {
          const removedNode = removeNode(nodes[i].children!, path);
          if (removedNode) return removedNode;
        }
      }
      return null;
    };

    const node = removeNode(states.routeNodes.nodes, path);
    if (node) {
      if (newParentPath === null) {
        states.routeNodes.nodes.push(node);
      } else {
        const parentNode = findNode(
          states.routeNodes.nodes,
          newParentPath
        );
        if (parentNode) {
          parentNode.children = parentNode.children ?? [];
          parentNode.children.push(node);
        }
      }
    }
  },

  getNode(path: string): RouteNode | null {
    const findNode = (nodes: RouteNode[], path: string): RouteNode | null => {
      for (const node of nodes) {
        if (node.path === path) return node;
        if (node.children) {
          const found = findNode(node.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    return findNode(states.routeNodes.nodes, path);
  },
};
