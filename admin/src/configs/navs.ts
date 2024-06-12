export interface NavItem {
  key: string;
  label: string;
  items?: NavItem[];
}

export type SiteAgreementNavs = Array<
  string | SiteAgreementNavs | { [key: string]: SiteAgreementNavs }
>;

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

export const transformNavs = (
  navs: SiteAgreementNavs,
  labelMap: { [key: string]: string }
): NavItem[] => {
  const transformItem = (
    item: string | SiteAgreementNavs | { [key: string]: SiteAgreementNavs }
  ): NavItem | null => {
    if (typeof item === "string") {
      return { key: item, label: labelMap[item] || item };
    } else if (
      Array.isArray(item) &&
      typeof item[0] === "string" &&
      Array.isArray(item[1])
    ) {
      /**
       * 父子关系
       */
      const [key, children] = item;
      return {
        key: key as string,
        label: labelMap[key as string] || (key as string),
        items: transformNavs(children, labelMap),
      };
    }
    return null;
  };

  return navs
    .map(transformItem)
    .filter((item): item is NavItem => item !== null); // Filter out null values
};

export const topNavs: NavItem[] = transformNavs(siteAgreementNavs, labelMap);
