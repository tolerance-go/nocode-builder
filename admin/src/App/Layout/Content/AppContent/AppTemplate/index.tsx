import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import React from "react";
import { CardList } from "./CardList";
import { css } from "@emotion/css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "123", label: "Option 13" },
      { key: "144", label: "Option 14" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "145463", label: "Option 13" },
      { key: "15674", label: "Option 14" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13345", label: "Option 13" },
      { key: "14564", label: "Option 14" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "1453", label: "Option 13" },
      { key: "1474", label: "Option 14" },
    ],
  },
];

export const AppTemplate: React.FC = () => {
  return (
    <div className="mx-auto p-10 w-[1400px]">
      <div className="flex gap-10">
        <div className="w-[210px] flex-shrink-0">
          <Typography.Title level={3} className="ml-4 pb-1">
            推荐模板
          </Typography.Title>
          <Menu
            mode="inline"
            items={items}
            className={css`
              & {
                border-right: none !important;
              }
            `}
          />
        </div>
        <div className="flex-grow">
          <CardList />
        </div>
      </div>
    </div>
  );
};
