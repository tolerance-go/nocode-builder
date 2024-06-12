import { SiteAgreementNavs } from "@/types";
import { describe, expect, it } from "vitest";
import { transformNavs } from ".";

describe("transformNavs", () => {
  it("should transform siteAgreementNavs to topNavs correctly", () => {
    const data: SiteAgreementNavs = ["a", ["b", ["b-1", "b-2"]], "c"];

    const result = transformNavs(data, {});

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "key": "a",
          "label": "a",
        },
        {
          "items": [
            {
              "key": "b-1",
              "label": "b-1",
            },
            {
              "key": "b-2",
              "label": "b-2",
            },
          ],
          "key": "b",
          "label": "b",
        },
        {
          "key": "c",
          "label": "c",
        },
      ]
    `);
  });

  it("should transform siteAgreementNavs to topNavs correctly", () => {
    const siteAgreementNavs: SiteAgreementNavs = [
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

    const labelMap: { [key: string]: string } = {
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

    const result = transformNavs(siteAgreementNavs, labelMap);

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "items": [
            {
              "items": [
                {
                  "key": "data",
                  "label": "数据",
                },
                {
                  "key": "design",
                  "label": "设计",
                },
                {
                  "key": "pipelines",
                  "label": "管道",
                },
                {
                  "key": "dashboard",
                  "label": "仪表板",
                },
                {
                  "key": "settings",
                  "label": "设置",
                },
              ],
              "key": ":id",
              "label": ":id",
            },
          ],
          "key": "apps",
          "label": "应用",
        },
        {
          "key": "users",
          "label": "用户",
        },
        {
          "key": "plugins",
          "label": "插件",
        },
        {
          "key": "settings",
          "label": "设置",
        },
      ]
    `);
  });
});
