import { ReactShapeConfig } from "@antv/x6-react-shape";
import { SearchNode } from ".";
import { NodeConfig } from "@/types";

export const SearchNodeShape: ReactShapeConfig = {
  shape: "search-node",
  width: 300,
  height: 400,
  component: SearchNode,
};

export const SearchNodeConfig: NodeConfig = {
  id: "SearchNode",
  shapeName: SearchNodeShape.shape,
  shape: SearchNodeShape,
};
