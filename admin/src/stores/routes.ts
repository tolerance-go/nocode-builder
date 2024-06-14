import { RouteNode } from "@/types";
import { proxy } from "valtio";

const routeNodes = proxy({
  nodes: [] as RouteNode[],
});

export const states = proxy({
  routeNodes,
});

export const actions = {
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
