import { NodeData } from "@/stores/designs";

export const exampleNodeData: NodeData = [
  {
    id: "1",
    elementType: "div",
    staticProps: { style: { background: "lightblue", padding: "10px" } },
    children: [
      {
        id: "2",
        elementType: "span",
        staticProps: { style: { color: "red" } },
        children: [
          {
            id: "3",
            elementType: "div",
            staticProps: { style: { fontSize: "20px" } },
            children: ["sdlfj", "alsdjf"],
          },
          {
            id: "4",
            elementType: "div",
            staticProps: { style: { fontSize: "20px" } },
            children: ["sdlfj"],
          },
        ],
      },
    ],
  },
];
