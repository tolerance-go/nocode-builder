import { css } from "@emotion/css";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import React from "react";
import { ComponentDisplay } from "./ComponentDisplay";

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const items: CollapseProps["items"] = [
  {
    key: "基础",
    label: "基础",
    children: <ComponentDisplay />,
  },
  {
    key: "布局",
    label: "布局",
    children: <ComponentDisplay />,
  },
  {
    key: "表单",
    label: "表单",
    children: <ComponentDisplay />,
  },
  {
    key: "媒体",
    label: "媒体",
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
    defaultActiveKey={["基础", "表单", "媒体", "布局", "其他"]}
    size="small"
    ghost
  />
);
