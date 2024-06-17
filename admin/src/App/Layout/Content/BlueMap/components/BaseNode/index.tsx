import { Typography } from "antd";
import React from "react";
import { X6ReactComponentProps } from "../../types";

export const BaseNode: React.FC<
  X6ReactComponentProps & {
    title?: string;
    children?: React.ReactNode;
  }
> = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-900 overflow-hidden rounded-md h-[100%]">
      <div className="mb-2 bg-gray-200 px-2 py-1">
        <Typography.Text>{title ?? "节点名称"}</Typography.Text>
      </div>
      <div className="px-2 py-1">{children}</div>
    </div>
  );
};
