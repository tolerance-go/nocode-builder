import { Cell } from "@antv/x6";
import { BaseNode } from "../BaseNode";
import { X6ReactComponentProps } from "@/types/blueMap";

export type EventNodeAttrs = Cell.Common["attrs"];

export const EventNode = (props: X6ReactComponentProps) => {
  return (
    <BaseNode
      {...props}
      classNames={{
        header: 'bg-red-200',
      }}
      title="事件"
    ></BaseNode>
  );
};
