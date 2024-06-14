import { describe, it, expect, beforeEach } from "vitest";
import { actions, states } from "./routes";
import { RouteNode } from "@/types";

describe("actions", () => {
  beforeEach(() => {
    // 每个测试前重置状态
    states.routeNodes.nodes = [];
  });

  describe("addNode", () => {
    it("当 parentId 为 null 时应该在根目录添加一个新节点", () => {
      const newNode: RouteNode = { id: "1", path: "/new-node", children: [] };
      actions.addNode(null, newNode);

      expect(states.routeNodes.nodes).toHaveLength(1);
      expect(states.routeNodes.nodes[0]).toEqual(newNode);
    });

    it("应该在指定的父节点下添加一个新节点", () => {
      const parent: RouteNode = { id: "1", path: "/parent", children: [] };
      const newNode: RouteNode = {
        id: "2",
        path: "/parent/child",
        children: [],
      };
      states.routeNodes.nodes.push(parent);

      actions.addNode("1", newNode);

      expect(states.routeNodes.nodes[0].children).toHaveLength(1);
      expect(states.routeNodes.nodes[0].children![0]).toEqual(newNode);
    });

    it("如果父 id 不存在，不应该添加新节点", () => {
      const newNode: RouteNode = {
        id: "2",
        path: "/non-existent-parent/child",
        children: [],
      };

      actions.addNode("non-existent-id", newNode);

      expect(states.routeNodes.nodes).toHaveLength(0);
    });
  });
});
