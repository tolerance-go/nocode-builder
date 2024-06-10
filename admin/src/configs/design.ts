import { NodeData } from "@/stores/designs";

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
            height: "300px",
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
        ],
      },
    ],
  },
];
