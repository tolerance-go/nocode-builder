import { describe, it, expect, beforeEach } from "vitest";
import { states, actions } from "@/stores/routes"; // 替换为实际路径
import { RouteNode } from "@/types";

describe("getNodeFullPath", () => {
  // 初始化测试数据
  const rootNode: RouteNode = {
    id: "root",
    path: "/",
    children: [
      {
        id: "child1",
        path: "child1",
        children: [
          {
            id: "grandchild1",
            path: "grandchild1",
            children: [],
          },
        ],
      },
      {
        id: "child2",
        path: "child2",
        children: [],
      },
    ],
  };

  beforeEach(() => {
    states.routeNodes.nodes = [rootNode];
  });

  it("应该返回节点的完整路径", () => {
    const fullPath = actions.getNodeFullPath("grandchild1");
    expect(fullPath).toBe("/child1/grandchild1");
  });

  it("应该返回根节点的路径", () => {
    const fullPath = actions.getNodeFullPath("root");
    expect(fullPath).toBe("/");
  });

  it("应该返回子节点的完整路径", () => {
    const fullPath = actions.getNodeFullPath("child2");
    expect(fullPath).toBe("/child2");
  });

  it("如果节点不存在，应该返回 null", () => {
    const fullPath = actions.getNodeFullPath("nonexistent");
    expect(fullPath).toBeNull();
  });
});

describe("getNodeFullPath", () => {
  // 初始化测试数据
  const rootNode: RouteNode = {
    id: "1718353525602",
    path: "/admin",
    children: [
      {
        id: "child2",
        path: "child2",
        children: [],
      },
    ],
  };

  beforeEach(() => {
    states.routeNodes.nodes = [rootNode];
  });

  it("应该返回节点的完整路径", () => {
    let fullPath = actions.getNodeFullPath("1718353525602");
    expect(fullPath).toBe("/admin");

    fullPath = actions.getNodeFullPath("child2");
    expect(fullPath).toBe("/admin/child2");
  });

  it("如果节点不存在，应该返回 null", () => {
    const fullPath = actions.getNodeFullPath("nonexistent");
    expect(fullPath).toBeNull();
  });
});
