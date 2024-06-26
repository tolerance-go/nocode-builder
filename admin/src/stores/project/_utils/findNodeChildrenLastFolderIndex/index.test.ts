import { CustomTreeDataNode } from "@/types/tree";
import { describe, it, expect } from "vitest";
import { findNodeChildrenLastFolderIndex } from ".";

// 示例节点
const exampleNode: CustomTreeDataNode = {
  key: "1",
  id: 1,
  children: [
    { key: "1-1", id: 2 },
    { key: "1-2", id: 3, children: [] }, // 文件夹
    { key: "1-3", id: 4, children: [] }, // 文件夹
    { key: "1-4", id: 5 },
  ],
};

describe("findNodeChildrenLastFolderIndex", () => {
  it("应找到最后一个文件夹的位置", () => {
    const result = findNodeChildrenLastFolderIndex(exampleNode);
    expect(result).toBe(2);
  });

  it("应返回null当没有文件夹时", () => {
    const nodeWithoutFolders: CustomTreeDataNode = {
      key: "2",
      id: 6,
      children: [
        { key: "2-1", id: 7 },
        { key: "2-2", id: 8 },
      ],
    };
    const result = findNodeChildrenLastFolderIndex(nodeWithoutFolders);
    expect(result).toBeNull();
  });

  it("应返回null当没有子节点时", () => {
    const nodeWithoutChildren: CustomTreeDataNode = {
      key: "3",
      id: 9,
    };
    const result = findNodeChildrenLastFolderIndex(nodeWithoutChildren);
    expect(result).toBeNull();
  });
});
