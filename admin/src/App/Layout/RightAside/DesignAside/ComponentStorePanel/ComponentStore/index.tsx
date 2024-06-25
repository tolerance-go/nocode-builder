import { css } from "@emotion/css";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import React from "react";
import { ComponentDisplay } from "./ComponentDisplay";
import { useSnapshot } from "valtio";
import store from "@/store";

export const ComponentStore: React.FC = () => {
  const { groupComponents } = useSnapshot(
    store.components.states.windowDisplayComponents
  );

  const items: CollapseProps["items"] = groupComponents.map((group) => ({
    key: group.name,
    label: group.name,
    children: <ComponentDisplay components={group.components} />,
  }));

  return (
    <Collapse
      className={css`
        .ant-collapse-content-box {
          padding: 0px !important;
        }
      `}
      items={items}
      bordered={false}
      defaultActiveKey={groupComponents.map((group) => group.name)}
      size="small"
      ghost
    />
  );
};
