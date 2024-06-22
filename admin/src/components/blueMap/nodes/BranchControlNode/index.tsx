import { Cell } from "@antv/x6";
import { BaseNode } from "../BaseNode";
import { X6ReactComponentProps } from "@/types/blueMap";

export type BranchControlNodeAttrs = Cell.Common["attrs"];

export const BranchControlNode = (props: X6ReactComponentProps) => {
  return (
    <BaseNode
      {...props}
      classNames={{
        header: "bg-gray-200",
      }}
      title="分支"
    ></BaseNode>
  );
};
