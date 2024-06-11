import { css } from "@emotion/css";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import React from "react";
import { ComponentDisplay } from "./ComponentDisplay";

const items: CollapseProps["items"] = [
  {
    key: "通用",
    label: "通用",
    children: <ComponentDisplay />,
  },
  {
    key: "布局",
    label: "布局",
    children: <ComponentDisplay />,
  },
  {
    key: "导航",
    label: "导航",
    children: <ComponentDisplay />,
  },
  {
    key: "反馈",
    label: "反馈",
    children: <ComponentDisplay />,
  },
  {
    key: "表单",
    label: "表单",
    children: <ComponentDisplay />,
  },
  {
    key: "展示",
    label: "展示",
    children: <ComponentDisplay />,
  },
  {
    key: "其他",
    label: "其他",
    children: <ComponentDisplay />,
  },
];

export const ComponentStore: React.FC = () => (
  <Collapse
    className={css`
      .ant-collapse-content-box {
        padding: 0 !important;
      }
    `}
    items={items}
    bordered={false}
    defaultActiveKey={["展示", "导航", "表单", "通用", "反馈", "布局", "其他"]}
    size="small"
    ghost
  />
);
