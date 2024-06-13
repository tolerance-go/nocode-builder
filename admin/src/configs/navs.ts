import { NavItem, SiteAgreementNavs } from "@/types";
import { transformNavs } from "@/utils/transformNavs";

// labels.ts
export const labelMap: { [key: string]: string } = {
  apps: "应用",
  data: "数据",
  design: "设计",
  bluemap: "蓝图",
  dashboard: "仪表板",
  settings: "设置",
  users: "用户",
  plugins: "插件",
  componentStore: "组件商店",
  editor: "编辑器",
  segmented: "分段",
  component: "组件",
  section: "部分",
  template: "模板",
};

export const siteAgreementNavs: SiteAgreementNavs = [
  [
    "apps",
    [
      [
        ":id",
        [
          "data",
          [
            "design",
            {
              rightSide: [
                [
                  "componentStore",
                  {
                    segmented: ["component", "section", "template"],
                  },
                ],
                "editor",
              ],
            },
          ],
          "bluemap",
          "dashboard",
          "settings",
        ],
      ],
    ],
  ],
  "users",
  "plugins",
  "settings",
];

export const topNavs: NavItem[] = transformNavs(siteAgreementNavs, labelMap);

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
    key: "pipelines",
    label: "管道",
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
