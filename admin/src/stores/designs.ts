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

const designTreeData = proxy<{
  nodeData: NodeData;
}>({
  nodeData: [],
});

export const states = {
  designTreeData,
};

export const actions = {
  replaceNodeData: (data: NodeData) => {
    designTreeData.nodeData = data;
  },
};
