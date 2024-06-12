import { NavItem, SiteAgreementNavs } from "@/types";
import { transformNavs } from "@/utils/transformNavs";

// labels.ts
export const labelMap: { [key: string]: string } = {
  apps: "应用",
  data: "数据",
  design: "设计",
  pipelines: "管道",
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
          "pipelines",
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
