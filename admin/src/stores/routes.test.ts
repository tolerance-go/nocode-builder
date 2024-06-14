import { describe, it, expect, beforeEach } from "vitest";
import { actions, states } from "./routes";
import { RouteNode } from "@/types";

describe("actions", () => {
  beforeEach(() => {
    // 每个测试前重置状态
    states.routeNodes.nodes = [];
  });

  describe("addNode", () => {
    it("当 parentPath 为 null 时应该在根目录添加一个新节点", () => {
      const newNode: RouteNode = { path: "/new-node", children: [] };
      actions.addNode(null, newNode);

      expect(states.routeNodes.nodes).toHaveLength(1);
      expect(states.routeNodes.nodes[0]).toEqual(newNode);
    });

    it("应该在指定的父节点下添加一个新节点", () => {
      const parent: RouteNode = { path: "/parent", children: [] };
      const newNode: RouteNode = { path: "/parent/child", children: [] };
      states.routeNodes.nodes.push(parent);

      actions.addNode("/parent", newNode);

      expect(states.routeNodes.nodes[0].children).toHaveLength(1);
      expect(states.routeNodes.nodes[0].children![0]).toEqual(newNode);
    });

    it("如果父路径不存在，不应该添加新节点", () => {
      const newNode: RouteNode = {
        path: "/non-existent-parent/child",
        children: [],
      };

      actions.addNode("/non-existent-parent", newNode);

      expect(states.routeNodes.nodes).toHaveLength(0);
    });
  });
});
