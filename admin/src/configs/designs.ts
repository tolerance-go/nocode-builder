import { NodeData } from "@/types/common";

export const exampleNodeData: NodeData[] = [
  {
    id: "1",
    elementType: "div",
    styles: { background: "lightblue", padding: "20px" },
    fromWidgetId: "component-test-Custom",
    settings: {},
    children: [
      {
        id: "1-1",
        elementType: "div",
        styles: {
          background: "blue",
          width: "100px",
          height: "100px",
        },
        fromWidgetId: "component-test-Custom",
        settings: {},
      },
      {
        id: "1-2",
        elementType: "div",
        styles: {
          background: "white",
          width: "300px",
          height: "500px",
          padding: "30px",
        },
        fromWidgetId: "component-test-Custom",
        settings: {},
        children: [
          {
            id: "1-2-1",
            elementType: "div",
            styles: {
              background: "yellow",
              width: "100px",
              height: "100px",
            },
            fromWidgetId: "component-test-Custom",
            settings: {},
          },
          {
            id: "1-2-2",
            elementType: "div",
            styles: {
              background: "red",
              width: "100px",
              height: "100px",
            },
            fromWidgetId: "component-test-Custom",
            settings: {},
          },
          {
            id: "1-2-3",
            elementType: "Custom",
            styles: {
              background: "green",
              width: "150px",
              height: "150px",
              padding: "10px",
            },
            fromWidgetId: "component-test-Custom",
            settings: {},
            children: [
              {
                id: "1-2-3-1",
                elementType: "div",
                styles: {
                  background: "blue",
                  width: "100px",
                  height: "100px",
                },
                fromWidgetId: "component-test-Custom",
                settings: {},
              },
            ],
          },
          {
            id: "1-2-4",
            elementType: "CustomWithSlots",
            styles: {
              background: "#91caff",
              width: "350px",
              height: "350px",
              padding: "10px",
            },
            fromWidgetId: "component-test-Custom",
            settings: {},
            children: {
              slot0: {
                id: "1-2-4-1",
                elementType: "div",
                styles: {
                  background: "blue",
                  width: "100px",
                  height: "100px",
                },
                fromWidgetId: "component-test-Custom",
                settings: {},
              },
            },
          },
        ] as NodeData[],
      },
    ],
  },
];
