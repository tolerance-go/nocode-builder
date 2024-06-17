import { describe, it, expect } from "vitest";
import { defaultData, getParentKey } from "./treeData";

describe("getParentKey", () => {
  it("应该返回第三级节点的正确父节点键", () => {
    const result = getParentKey("0-0-0-0", defaultData);
    expect(result).toBe("0-0-0");
  });

  it("应该返回第二级节点的正确父节点键", () => {
    const result = getParentKey("0-0-0", defaultData);
    expect(result).toBe("0-0");
  });

  it("应该返回第一级节点的正确父节点键", () => {
    const result = getParentKey("0-0", defaultData);
    expect(result).toBeUndefined(); // 0-0 是根节点，没有父节点
  });

  it("应该返回另一个第三级节点的正确父节点键", () => {
    const result = getParentKey("0-0-1-1", defaultData);
    expect(result).toBe("0-0-1");
  });

  it("应该返回另一个第二级节点的正确父节点键", () => {
    const result = getParentKey("0-1-0", defaultData);
    expect(result).toBe("0-1");
  });

  it("应该返回未定义对于不存在的键", () => {
    const result = getParentKey("non-existent-key", defaultData);
    expect(result).toBeUndefined();
  });
});
