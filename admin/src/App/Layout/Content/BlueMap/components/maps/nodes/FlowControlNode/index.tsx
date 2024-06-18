import { X6ReactComponentProps } from "../../../../types";
import { BaseNode, BaseNodeAttrs } from "../../../nodes/BaseNode";

export type FlowControlNodeAttrs = BaseNodeAttrs;

export const FlowControlNode = (props: X6ReactComponentProps) => {
  return <BaseNode {...props} title="控制流节点"></BaseNode>;
};
