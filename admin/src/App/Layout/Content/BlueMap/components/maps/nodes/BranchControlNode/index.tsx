import { Cell } from "@antv/x6";
import { X6ReactComponentProps } from "../../../../types";
import { BaseNode } from "../../../nodes/BaseNode";

export type BranchControlNodeAttrs = Cell.Common["attrs"];

export const BranchControlNode = (props: X6ReactComponentProps) => {
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
