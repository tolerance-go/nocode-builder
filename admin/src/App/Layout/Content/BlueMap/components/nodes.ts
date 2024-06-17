import { X6ReactComponentProps } from "../types";
import { BaseNode } from "./nodes/BaseNode";
import { SearchNode } from "./nodes/SearchNode";

/**
 * shape 到组件的 map
 */
export const nodes: {
  [key: string]: React.FC<X6ReactComponentProps>;
} = {
  BaseNode,
  SearchNode,
};
