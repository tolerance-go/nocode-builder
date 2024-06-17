import { X6ReactComponentProps } from "../types";
import { BaseNode } from "./BaseNode";
import { SearchNode } from "./SearchNode";

/**
 * shape 到组件的 map
 */
export const nodes: {
  [key: string]: React.FC<X6ReactComponentProps>;
} = {
  BaseNode,
  SearchNode,
};
