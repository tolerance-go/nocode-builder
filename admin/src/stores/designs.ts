import { proxy } from "valtio";

type StaticPropsValue = string | number | boolean | null | undefined;

type StaticProps = {
  [key: string]: StaticPropsValue | StaticProps;
};

export type Node = {
  id: string;
  elementType: string;
  children?: (Node | string | number | boolean | null | undefined)[];
  staticProps: StaticProps;
};

export type NodeData = Node["children"];

const exampleNodeData: NodeData = [
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

const designTreeData = proxy<{
  nodeData: NodeData;
}>({
  nodeData: exampleNodeData,
});

export const states = {
  designTreeData,
};
