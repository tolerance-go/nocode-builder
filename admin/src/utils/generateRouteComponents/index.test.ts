import { NodeData, RouteNodeData } from "@/types";
import { describe, expect, it } from "vitest";
import { generateRouteComponents } from ".";

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
    expect(generateRouteComponents(nodeDatas)).toEqual([
      {
        type: "Route",
        path: "/",
        element: [
          {
            id: "1-1",
            elementType: "div",
            staticProps: {},
            fromWidgetId: "",
            settings: {},
            children: [],
          },
        ],
        children: [],
      },
    ]);
  });

  it("test2", () => {
    const nodeDatas: RouteNodeData[] = [
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

    expect(generateRouteComponents(nodeDatas)).toEqual([
      {
        type: "Route",
        path: "/",
        element: [
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
                      id: "1-1-3_outlet",
                      elementType: "Outlet",
                      staticProps: {},
                      fromWidgetId: "",
                      settings: {},
                      children: [],
                    },
                  ],
                },
              ],
            },
          },
        ],
        children: [
          {
            type: "Route",
            path: "route1",
            element: [
              {
                id: "1-1-3-1-1",
                elementType: "div",
                staticProps: {},
                fromWidgetId: "",
                settings: {},
                children: [],
              },
            ],
            children: [],
          },
          {
            type: "Route",
            path: "route2",
            element: [
              {
                id: "1-1-3-2-1",
                elementType: "div",
                staticProps: {},
                fromWidgetId: "",
                settings: {},
                children: [],
              },
            ],
            children: [],
          },
        ],
      },
    ]);
  });

  it("同个父节点下面存在多个不同父节点的 Route", () => {
    const nodeDatas: RouteNodeData[] = [
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
              sidebar: [
                {
                  id: "1-1-2",
                  elementType: "Sidebar",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [
                    {
                      id: "1-1-2-1",
                      elementType: "Route",
                      staticProps: {},
                      fromWidgetId: "",
                      settings: {
                        path: "route1",
                      },
                      children: [
                        {
                          id: "1-1-2-1-1",
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
                  ],
                },
              ],
            },
          },
        ],
      },
    ];

    expect(() =>
      generateRouteComponents(nodeDatas)
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: 结构无效：Route 节点不是兄弟节点。]`
    );
  });

  it("同一个父节点下的 Route 不是相邻的", () => {
    const nodeDatas: RouteNodeData[] = [
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
              content: [
                {
                  id: "1-1-0",
                  elementType: "div",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
                {
                  id: "1-1-1",
                  elementType: "Route",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {
                    path: "route1",
                  },
                  children: [],
                },
                {
                  id: "1-1-2",
                  elementType: "div",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
                {
                  id: "1-1-3",
                  elementType: "Route",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {
                    path: "route1",
                  },
                  children: [],
                },
              ],
            },
          },
        ],
      },
    ];

    expect(() =>
      generateRouteComponents(nodeDatas)
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: 结构无效：Route 节点不是紧邻的。]`
    );
  });

  it("同一个父节点下的 Route 不是相邻的", () => {
    const nodeDatas: RouteNodeData[] = [
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
              content: [
                {
                  id: "1-1-0",
                  elementType: "div",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
                {
                  id: "1-1-1",
                  elementType: "Route",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {
                    path: "route1",
                  },
                  children: [],
                },
                {
                  id: "1-1-2",
                  elementType: "div",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {},
                  children: [],
                },
                {
                  id: "1-1-3",
                  elementType: "Route",
                  staticProps: {},
                  fromWidgetId: "",
                  settings: {
                    path: "route1",
                  },
                  children: [],
                },
              ],
            },
          },
        ],
      },
    ];

    expect(() =>
      generateRouteComponents(nodeDatas)
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: 结构无效：Route 节点不是紧邻的。]`
    );
  });
});
