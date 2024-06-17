import { describe, it, expect } from "vitest";
import { getExpandedKeys } from "./getExpandedKeys";
import { defaultData } from "../treeData";

describe("getExpandedKeys", () => {
  it('应该返回正确的展开节点键数组 - 搜索 "0-0-0-0"', () => {
    const result = getExpandedKeys("0-0-0-0", defaultData);
    expect(result).toEqual(expect.arrayContaining(["0-0", "0-0-0", "0-0-0-0"]));
  });

  it('应该返回正确的展开节点键数组 - 搜索 "0-1-0"', () => {
    const result = getExpandedKeys("0-1-0", defaultData);
    expect(result).toEqual(expect.arrayContaining(["0-1", "0-1-0"]));
  });

  it("应该返回空数组 - 搜索不存在的节点", () => {
    const result = getExpandedKeys("non-existent-key", defaultData);
    expect(result).toEqual([]);
  });

  it('应该返回根节点的父键 - 搜索 "0-0"', () => {
    const result = getExpandedKeys("0-0", defaultData);
    expect(result).toEqual(expect.arrayContaining(["0-0"]));
  });

  it('应该返回正确的展开节点键数组 - 搜索 "0-0-1-1"', () => {
    const result = getExpandedKeys("0-0-1-1", defaultData);
    expect(result).toEqual(expect.arrayContaining(["0-0", "0-0-1", "0-0-1-1"]));
  });
});
