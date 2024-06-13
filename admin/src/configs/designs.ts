import { NodeData } from "@/types";

export const exampleNodeData: NodeData[] = [
  {
    id: "1",
    elementType: "div",
    staticProps: { style: { background: "lightblue", padding: "20px" } },
    children: [
      {
        id: "1-1",
        elementType: "div",
        staticProps: {
          style: { background: "blue", width: "100px", height: "100px" },
        },
      },
      {
        id: "1-2",
        elementType: "div",
        staticProps: {
          style: {
            background: "white",
            width: "300px",
            height: "500px",
            padding: "30px",
          },
        },
        children: [
          {
            id: "1-2-1",
            elementType: "div",
            staticProps: {
              style: { background: "yellow", width: "100px", height: "100px" },
            },
          },
          {
            id: "1-2-2",
            elementType: "div",
            staticProps: {
              style: { background: "red", width: "100px", height: "100px" },
            },
          },
          {
            id: "1-2-3",
            elementType: "Custom",
            staticProps: {
              style: {
                background: "green",
                width: "150px",
                height: "150px",
                padding: "10px",
              },
            },
            children: [
              {
                id: "1-2-3-1",
                elementType: "div",
                staticProps: {
                  style: {
                    background: "blue",
                    width: "100px",
                    height: "100px",
                  },
                },
              },
            ],
          },
          {
            id: "1-2-4",
            elementType: "CustomWithSlots",
            staticProps: {
              style: {
                background: "#91caff",
                width: "350px",
                height: "350px",
                padding: "10px",
              },
            },
            children: {
              slot0: {
                id: "1-2-4-1",
                elementType: "div",
                staticProps: {
                  style: {
                    background: "blue",
                    width: "100px",
                    height: "100px",
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
];
