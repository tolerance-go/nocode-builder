import { X6ReactComponentProps } from "../types";
import { BaseNode } from "../components/nodes/BaseNode";
import { SearchNode } from "../components/nodes/SearchNode";
import { FlowControlNode } from "../components/maps/nodes/FlowControlNode";

/**
 * shape 到组件的 map
 */
export const nodes: {
  [key: string]: React.FC<X6ReactComponentProps>;
} = {
  BaseNode,
  SearchNode,
  FlowControlNode,
};
