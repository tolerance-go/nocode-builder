import { NodeData } from "@/types";
import { describe, expect, it } from "vitest";
import { extractRoutes } from "./extractRoutes";

describe("generateRouterComponent", () => {
  it("test1", () => {
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
            elementType: "div",
            staticProps: {},
            fromWidgetId: "",
            settings: {},
            children: [],
          },
        ],
      },
    ];
    expect(extractRoutes(nodeDatas)).toMatchInlineSnapshot(`
      [
        {
          "children": [],
          "elementType": "Route",
          "fromWidgetId": "",
          "id": "1",
          "path": "/",
          "settings": {
            "path": "/",
          },
          "staticProps": {},
        },
      ]
    `);
  });

  it("test2", () => {
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

    expect(extractRoutes(nodeDatas)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "elementType": "Route",
              "fromWidgetId": "",
              "id": "1-1-3-1",
              "path": "route1",
              "settings": {
                "path": "route1",
              },
              "staticProps": {},
            },
            {
              "children": [],
              "elementType": "Route",
              "fromWidgetId": "",
              "id": "1-1-3-2",
              "path": "route2",
              "settings": {
                "path": "route2",
              },
              "staticProps": {},
            },
          ],
          "elementType": "Route",
          "fromWidgetId": "",
          "id": "1",
          "path": "/",
          "settings": {
            "path": "/",
          },
          "staticProps": {},
        },
      ]
    `);
  });



  it("test2", () => {
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

    expect(extractRoutes(nodeDatas)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "elementType": "Route",
              "fromWidgetId": "",
              "id": "1-1-3-1",
              "path": "route1",
              "settings": {
                "path": "route1",
              },
              "staticProps": {},
            },
            {
              "children": [],
              "elementType": "Route",
              "fromWidgetId": "",
              "id": "1-1-3-2",
              "path": "route2",
              "settings": {
                "path": "route2",
              },
              "staticProps": {},
            },
          ],
          "elementType": "Route",
          "fromWidgetId": "",
          "id": "1",
          "path": "/",
          "settings": {
            "path": "/",
          },
          "staticProps": {},
        },
      ]
    `);
  });
});
