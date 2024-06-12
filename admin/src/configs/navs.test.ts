import { describe, expect, it } from "vitest";
import {
  SiteAgreementNavs,
  labelMap,
  siteAgreementNavs,
  transformNavs,
} from "./navs";

describe("transformNavs", () => {
  it("should transform siteAgreementNavs to topNavs correctly", () => {
    const data: SiteAgreementNavs = ["a", ["b", ["b-1", "b-2"]], "c"];

    const result = transformNavs(data, {});

    expect(result).toEqual([
      {
        key: "a",
        label: "a",
      },
      {
        key: "b",
        label: "b",
        items: [
          {
            key: "b-1",
            label: "b-1",
          },
          {
            key: "b-2",
            label: "b-2",
          },
        ],
      },
      {
        key: "c",
        label: "c",
      },
    ]);
  });

  it("should transform siteAgreementNavs to topNavs correctly", () => {
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
