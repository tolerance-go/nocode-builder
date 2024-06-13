import { describe, it, expect } from "vitest";
import { findFirstItem } from ".";
import { NavItem } from "@/types";

describe("findFirstItem 函数测试", () => {
  const navData: NavItem[] = [
    {
      key: "apps",
      label: "应用",
      items: [
        {
          key: ":id",
          label: ":id",
          items: [
            {
              key: "data",
              label: "数据",
            },
            {
              key: "bluemap",
              label: "蓝图",
            },
            {
              key: "dashboard",
              label: "仪表板",
            },
            {
              key: "settings",
              label: "设置",
            },
          ],
        },
      ],
    },
    {
      key: "users",
      label: "用户",
    },
    {
      key: "plugins",
      label: "插件",
    },
    {
      key: "settings",
      label: "设置",
    },
  ];

  it("应该找到 apps/:id 下的第一个元素", () => {
    const result = findFirstItem(navData, "apps", ":id");
    expect(result).toEqual({
      key: "data",
      label: "数据",
    });
  });

  it("如果 parentKey 不存在，应该返回 undefined", () => {
    const result = findFirstItem(navData, "nonexistent", ":id");
    expect(result).toBeUndefined();
  });

  it("如果 childKey 不存在，应该返回 undefined", () => {
    const result = findFirstItem(navData, "apps", "nonexistent");
    expect(result).toBeUndefined();
  });

  it("如果指定的 childKey 下没有子元素，应该返回 undefined", () => {
    const result = findFirstItem(navData, "users", ":id");
    expect(result).toBeUndefined();
  });
});
