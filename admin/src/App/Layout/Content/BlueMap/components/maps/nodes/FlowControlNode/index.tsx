import { X6ReactComponentProps } from "../../../../types";
import { BaseNode, BaseNodeAttrs } from "../../../nodes/BaseNode";

export type FlowControlNodeAttrs = BaseNodeAttrs;

export const FlowControlNode = (props: X6ReactComponentProps) => {
  return (
    <BaseNode
      {...props}
      classNames={{
        header: "bg-gray-200",
      }}
      title="控制流"
    ></BaseNode>
  );
};
