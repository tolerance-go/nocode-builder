import { proxy } from "valtio";

type StaticPropsValue = string | number | boolean | null | undefined;

type StaticProps = {
  [key: string]: StaticPropsValue | StaticProps;
};

export type NodePlainChild = string | number | boolean | null | undefined;

export type NodeData = {
  id: string;
  elementType: string;
  children?: NodeData[] | NodePlainChild;
  staticProps: StaticProps;
};

const designTreeData = proxy<{
  nodeData: NodeData[];
}>({
  nodeData: [],
});

export const states = {
  designTreeData,
};

export const actions = {
  replaceNodeData: (data: NodeData[]) => {
    designTreeData.nodeData = data;
  },
};
