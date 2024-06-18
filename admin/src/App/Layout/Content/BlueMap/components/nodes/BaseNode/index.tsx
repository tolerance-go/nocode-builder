import { Typography } from "antd";
import React from "react";
import { X6ReactComponentProps } from "../../../types";
import { cx } from "@emotion/css";

export interface BaseNodeAttrs {}

export type BaseNodeComponentProps = X6ReactComponentProps & {
  title?: string;
  children?: React.ReactNode;
  classNames?: {
    header?: string;
  };
};

export const BaseNode: React.FC<BaseNodeComponentProps> = ({
  title,
  children,
  classNames,
}) => {
  return (
    <div className="bg-white border border-gray-900 overflow-hidden rounded-md h-[100%]">
      <div className={cx("mb-2 bg-gray-200 px-2 py-1", classNames?.header)}>
        <Typography.Text strong>{title ?? "节点名称"}</Typography.Text>
      </div>
      <div className="px-2 py-1">{children}</div>
    </div>
  );
};
