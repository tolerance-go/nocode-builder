import { NodeData } from "@/types";
import { describe, expect, it } from "vitest";
import { generateRouterComponent } from ".";

describe("generateRouterComponent", () => {
  // it("test1", () => {
  //   const nodeDatas: NodeData[] = [
  //     {
  //       id: "1",
  //       elementType: "Route",
  //       staticProps: {},
  //       settings: {
  //         path: "/",
  //       },
  //       fromWidgetId: "",
  //       children: [
  //         {
  //           id: "1-1",
  //           elementType: "div",
  //           staticProps: {},
  //           fromWidgetId: "",
  //           settings: {},
  //           children: [],
  //         },
  //       ],
  //     },
  //   ];
  //   expect(generateRouterComponent(nodeDatas)).toEqual([
  //     {
  //       type: "Route",
  //       path: "/",
  //       element: [
  //         {
  //           id: "1-1",
  //           elementType: "div",
  //           staticProps: {},
  //           fromWidgetId: "",
  //           settings: {},
  //           children: [],
  //         },
  //       ],
  //     },
  //   ]);
  // });

  // it("test2", () => {
  //   const nodeDatas: NodeData[] = [
  //     {
  //       id: "1",
  //       elementType: "Route",
  //       staticProps: {},
  //       settings: {
  //         path: "/",
  //       },
  //       fromWidgetId: "",
  //       children: [
  //         {
  //           id: "1-1",
  //           elementType: "Layout",
  //           staticProps: {},
  //           fromWidgetId: "",
  //           settings: {},
  //           children: {
  //             header: [
  //               {
  //                 id: "1-1-1",
  //                 elementType: "Header",
  //                 staticProps: {},
  //                 fromWidgetId: "",
  //                 settings: {},
  //                 children: [],
  //               },
  //             ],
  //             sidebar: [
  //               {
  //                 id: "1-1-2",
  //                 elementType: "Sidebar",
  //                 staticProps: {},
  //                 fromWidgetId: "",
  //                 settings: {},
  //                 children: [],
  //               },
  //             ],
  //             content: [
  //               {
  //                 id: "1-1-3",
  //                 elementType: "Content",
  //                 staticProps: {},
  //                 fromWidgetId: "",
  //                 settings: {},
  //                 children: [
  //                   {
  //                     id: "1-1-3-1",
  //                     elementType: "Route",
  //                     staticProps: {},
  //                     fromWidgetId: "",
  //                     settings: {
  //                       path: "route1",
  //                     },
  //                     children: [
  //                       {
  //                         id: "1-1-3-1-1",
  //                         elementType: "div",
  //                         staticProps: {},
  //                         fromWidgetId: "",
  //                         settings: {},
  //                         children: [],
  //                       },
  //                     ],
  //                   },
  //                   {
  //                     id: "1-1-3-2",
  //                     elementType: "Route",
  //                     staticProps: {},
  //                     fromWidgetId: "",
  //                     settings: {
  //                       path: "route2",
  //                     },
  //                     children: [
  //                       {
  //                         id: "1-1-3-2-1",
  //                         elementType: "div",
  //                         staticProps: {},
  //                         fromWidgetId: "",
  //                         settings: {},
  //                         children: [],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   ];

  //   expect(generateRouterComponent(nodeDatas)).toEqual([
  //     {
  //       type: "Route",
  //       path: "/",
  //       element: [
  //         {
  //           id: "1",
  //           elementType: "Route",
  //           staticProps: {},
  //           settings: {
  //             path: "/",
  //           },
  //           fromWidgetId: "",
  //           children: [
  //             {
  //               id: "1-1",
  //               elementType: "Layout",
  //               staticProps: {},
  //               fromWidgetId: "",
  //               settings: {},
  //               children: {
  //                 header: [
  //                   {
  //                     id: "1-1-1",
  //                     elementType: "Header",
  //                     staticProps: {},
  //                     fromWidgetId: "",
  //                     settings: {},
  //                     children: [],
  //                   },
  //                 ],
  //                 sidebar: [
  //                   {
  //                     id: "1-1-2",
  //                     elementType: "Sidebar",
  //                     staticProps: {},
  //                     fromWidgetId: "",
  //                     settings: {},
  //                     children: [],
  //                   },
  //                 ],
  //                 content: [
  //                   {
  //                     id: "1-1-3",
  //                     elementType: "Content",
  //                     staticProps: {},
  //                     fromWidgetId: "",
  //                     settings: {},
  //                     children: [
  //                       {
  //                         id: "1-1-3_outlet",
  //                         elementType: "Outlet",
  //                         staticProps: {},
  //                         fromWidgetId: "",
  //                         settings: {},
  //                         children: [],
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //       children: [
  //         {
  //           type: "Route",
  //           path: "route1",
  //           element: [
  //             {
  //               id: "1-1-3-1-1",
  //               elementType: "div",
  //               staticProps: {},
  //               fromWidgetId: "",
  //               settings: {},
  //               children: [],
  //             },
  //           ],
  //         },
  //         {
  //           type: "Route",
  //           path: "route2",
  //           element: [
  //             {
  //               id: "1-1-3-2-1",
  //               elementType: "div",
  //               staticProps: {},
  //               fromWidgetId: "",
  //               settings: {},
  //               children: [],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ]);
  // });

  it("test3", () => {
    const nodeDatas: NodeData[] = [
      {
        id: "1",
        elementType: "Route",
        staticProps: {},
        settings: {
          path: "/",
        },
        fromWidgetId: "",
        children: [
          {
            id: "1-1",
            elementType: "Layout",
            staticProps: {},
            fromWidgetId: "",
            settings: {},
            children: {
              header: [
                {
                  id: "1-1-1",
                  elementType: "Header",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
              ],
              sidebar: [
                {
                  id: "1-1-2",
                  elementType: "Sidebar",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
              ],
              content: [
                {
                  id: "1-1-3",
                  elementType: "Content",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [
                    {
                      id: "1-1-3-1",
                      elementType: "Route",
                      staticProps: {},
                      fromWidgetId: "",
                      settings: {
                        path: "route1",
                      },
                      children: [
                        {
                          id: "1-1-3-1-1",
                          elementType: "div",
                          staticProps: {},
                          fromWidgetId: "",
                          settings: {},
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "1-1-3-2",
                      elementType: "Route",
                      staticProps: {},
                      fromWidgetId: "",
                      settings: {
                        path: "route2",
                      },
                      children: [
                        {
                          id: "1-1-3-2-1",
                          elementType: "div",
                          staticProps: {},
                          fromWidgetId: "",
                          settings: {},
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ];

    expect(generateRouterComponent(nodeDatas)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "element": [
                {
                  "children": [],
                  "elementType": "div",
                  "fromWidgetId": "",
                  "id": "1-1-3-1-1",
                  "settings": {},
                  "staticProps": {},
                },
              ],
              "path": "route1",
              "type": "Route",
            },
            {
              "children": [],
              "element": [
                {
                  "children": [],
                  "elementType": "div",
                  "fromWidgetId": "",
                  "id": "1-1-3-2-1",
                  "settings": {},
                  "staticProps": {},
                },
              ],
              "path": "route2",
              "type": "Route",
            },
          ],
          "element": [
            {
              "children": {
                "content": [
                  {
                    "children": [
                      {
                        "children": [],
                        "elementType": "Outlet",
                        "fromWidgetId": "",
                        "id": "1-1-3-1",
                        "settings": {
                          "path": "route1",
                        },
                        "staticProps": {},
                      },
                      {
                        "children": [],
                        "elementType": "Outlet",
                        "fromWidgetId": "",
                        "id": "1-1-3-2",
                        "settings": {
                          "path": "route2",
                        },
                        "staticProps": {},
                      },
                    ],
                    "elementType": "Content",
                    "fromWidgetId": "",
                    "id": "1-1-3",
                    "settings": {},
                    "staticProps": {},
                  },
                ],
                "header": [
                  {
                    "children": [],
                    "elementType": "Header",
                    "fromWidgetId": "",
                    "id": "1-1-1",
                    "settings": {},
                    "staticProps": {},
                  },
                ],
                "sidebar": [
                  {
                    "children": [],
                    "elementType": "Sidebar",
                    "fromWidgetId": "",
                    "id": "1-1-2",
                    "settings": {},
                    "staticProps": {},
                  },
                ],
              },
              "elementType": "Layout",
              "fromWidgetId": "",
              "id": "1-1",
              "settings": {},
              "staticProps": {},
            },
          ],
          "path": "/",
          "type": "Route",
        },
      ]
    `);
  });
});
