import { NavItem } from "@/types";

/** 合法导航 */
export const siteAgreementNavs = [
  [
    "apps",
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
  "users",
  "plugins",
  "settings",
];

/**
 * 顶部导航
 */
export const topNavs: NavItem[] = [
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
