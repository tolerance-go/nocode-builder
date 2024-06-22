import { Cell } from "@antv/x6";
import { cx } from "@emotion/css";
import { Typography } from "antd";
import React from "react";
import { X6ReactComponentProps } from "../../../../types";

export type BaseNodeAttrs = Cell.Common["attrs"];

export type BaseNodeComponentProps = X6ReactComponentProps & {
  title?: string;
  children?: React.ReactNode;
  classNames?: {
    header?: string;
  };
  backgroundColor?: string;
};

export const BaseNode: React.FC<BaseNodeComponentProps> = ({
  title,
  children,
  classNames,
  backgroundColor,
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor ?? "rgba(255, 255, 255, 0.5)" }}
      className="border border-gray-900 overflow-hidden rounded-md h-[100%]"
    >
      <div className={cx("bg-gray-200 px-2 py-1", classNames?.header)}>
        <Typography.Text strong>{title ?? "节点名称"}</Typography.Text>
      </div>
      {children}
    </div>
  );
};
