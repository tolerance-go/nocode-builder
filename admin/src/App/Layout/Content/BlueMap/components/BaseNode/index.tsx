import { Typography } from "antd";
import React from "react";
import { X6ReactComponentProps } from "../../types";

export const BaseNode: React.FC<
  X6ReactComponentProps & {
    title?: string;
  }
> = ({ title }) => {
  return (
    <div className="bg-white border px-1.5 py-1 rounded-md h-[100%]">
      <div className="mb-1.5">
        <Typography.Text>{title ?? "节点名称"}</Typography.Text>
      </div>
    </div>
  );
};
