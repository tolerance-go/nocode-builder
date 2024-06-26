import { NavItem } from "@/types/common";

/**
 * 约定 key 就是 url item
 */
export const appSubNavs: NavItem[] = [
  {
    key: "data",
    label: "数据",
  },
  {
    key: "design",
    label: "设计",
  },
  {
    key: "dashboard",
    label: "仪表板",
  },
  {
    key: "settings",
    label: "设置",
  },
];

export const navTabs: NavItem[] = [
  {
    key: "apps",
    label: "应用",
    items: appSubNavs,
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
