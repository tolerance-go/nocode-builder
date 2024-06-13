import { NavItem } from "@/types";

export const appSubNavs = [
  {
    key: "data",
    label: "数据",
  },
  {
    key: "design",
    label: "设计",
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
