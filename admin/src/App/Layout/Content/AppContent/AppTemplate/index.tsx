import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import React from "react";
import { CardList } from "./CardList";

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
    <div className="mx-auto p-10 w-[1200px]">
      <Typography.Title level={3} className="ml-4 pb-1">
        推荐模板
      </Typography.Title>
      <div className="flex gap-5">
        <div className="w-[256px] flex-shrink-0">
          <Menu mode="inline" items={items} />
        </div>
        <div className="flex-grow">
          <CardList />
        </div>
      </div>
    </div>
  );
};
