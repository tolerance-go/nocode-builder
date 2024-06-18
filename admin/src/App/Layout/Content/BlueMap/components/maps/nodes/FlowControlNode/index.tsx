import { X6ReactComponentProps } from "../../../../types";
import { BaseNode, BaseNodeAttrs } from "../../../nodes/BaseNode";

export interface FlowControlNodeAttrs extends BaseNodeAttrs {}

export const FlowControlNode = (props: X6ReactComponentProps) => {
  return (
    <BaseNode
      {...props}
      classNames={{
        header: 'bg-violet-200',
      }}
    ></BaseNode>
  );
};
