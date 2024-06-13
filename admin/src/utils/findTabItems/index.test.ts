import { NavItem, SystemPaths } from "@/types";
import { describe, it, expect } from "vitest";
import { findTabItems } from ".";

describe("findTabItems", () => {
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

  it("第一层级", () => {
    const path: SystemPaths = [{ type: "nav", value: "apps" }];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
      {
        key: "apps",
        label: "应用",
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
    ]);
  });

  it("第一层级", () => {
    const path: SystemPaths = [{ type: "nav", value: "users" }];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
      {
        key: "apps",
        label: "应用",
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
    ]);
  });

  it("第一层级", () => {
    const path: SystemPaths = [];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
      {
        key: "apps",
        label: "应用",
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
    ]);
  });

  it("层级结构", () => {
    const path: SystemPaths = [
      { type: "nav", value: "apps" },
      {
        type: "id",
        value: "xxxx",
      },
    ];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
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
    ]);
  });

  it("层级结构", () => {
    const path: SystemPaths = [
      { type: "nav", value: "apps" },
      {
        type: "id",
        value: "xxxx",
      },
      {
        type: "nav",
        value: "data",
      },
    ];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
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
    ]);
  });

  it("层级结构", () => {
    const path: SystemPaths = [
      { type: "nav", value: "apps" },
      {
        type: "id",
        value: "xxxx",
      },
      {
        type: "nav",
        value: "bluemap",
      },
    ];
    const result = findTabItems(navData, path);
    expect(result).toEqual([
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
    ]);
  });
});
