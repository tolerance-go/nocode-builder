import { describe, it, expect } from "vitest";
import type { AppData, AppGroup } from "@/types";
import type { TreeDataNode } from "antd";
import { DeepReadonly } from "@/utils/types";
import { buildTreeData } from "./buildTreeData";

describe("buildTreeData 函数测试", () => {
  it("应该正确地将 apps 和 groups 转换为 treeData", () => {
    const apps: DeepReadonly<AppData[]> = [
      { id: 1, menuTitle: "App 1", groupId: 1 },
      { id: 2, menuTitle: "App 2", groupId: 2 },
      { id: 3, menuTitle: "App 3" },
    ];

    const groups: DeepReadonly<AppGroup[]> = [
      { id: 1, menuTitle: "Group 1" },
      { id: 2, menuTitle: "Group 2", parentGroupId: 1 },
    ];

    const expectedTreeData: TreeDataNode[] = [
      {
        title: "Group 1",
        key: "group-1",
        selectable: false,
        children: [
          { title: "App 1", key: "app-1", isLeaf: true },
          {
            title: "Group 2",
            key: "group-2",
            selectable: false,
            children: [{ title: "App 2", key: "app-2", isLeaf: true }],
          },
        ],
      },
      { title: "App 3", key: "app-3", isLeaf: true },
    ];

    const treeData = buildTreeData(apps, groups);

    expect(treeData).toEqual(expectedTreeData);
  });

  it("应该处理没有 groupId 的 App 并将其作为独立节点", () => {
    const apps: DeepReadonly<AppData[]> = [{ id: 4, menuTitle: "App 4" }];

    const groups: DeepReadonly<AppGroup[]> = [{ id: 3, menuTitle: "Group 3" }];

    const expectedTreeData: TreeDataNode[] = [
      { title: "Group 3", key: "group-3", children: [], selectable: false },
      { title: "App 4", key: "app-4", isLeaf: true },
    ];

    const treeData = buildTreeData(apps, groups);

    expect(treeData).toEqual(expectedTreeData);
  });

  it("应该处理嵌套的 AppGroup", () => {
    const apps: DeepReadonly<AppData[]> = [
      { id: 5, menuTitle: "App 5", groupId: 4 },
    ];

    const groups: DeepReadonly<AppGroup[]> = [
      { id: 4, menuTitle: "Group 4", parentGroupId: 3 },
      { id: 3, menuTitle: "Group 3" },
    ];

    const expectedTreeData: TreeDataNode[] = [
      {
        title: "Group 3",
        key: "group-3",
        selectable: false,
        children: [
          {
            title: "Group 4",
            key: "group-4",
            selectable: false,
            children: [{ title: "App 5", key: "app-5", isLeaf: true }],
          },
        ],
      },
    ];

    const treeData = buildTreeData(apps, groups);

    expect(treeData).toEqual(expectedTreeData);
  });
});
