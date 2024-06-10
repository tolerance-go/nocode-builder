import { NavItem } from "@/types";

/**
 * 顶部导航
 */
export const navs: NavItem[] = [
  {
    key: "apps",
    label: "apps",
    items: [
      {
        key: "data",
        label: "data",
        items: [
          {
            key: "models",
            label: "models",
          },
          {
            key: "tables",
            label: "tables",
          },
        ],
      },
      {
        key: "design",
        label: "design",
      },
      {
        key: "pipelines",
        label: "pipelines",
      },
      {
        key: "dashboard",
        label: "dashboard",
      },
      {
        key: "settings",
        label: "settings",
      },
    ],
  },
  {
    key: "users",
    label: "users",
  },
  {
    key: "plugins",
    label: "plugins",
  },
  {
    key: "settings",
    label: "settings",
  },
];
