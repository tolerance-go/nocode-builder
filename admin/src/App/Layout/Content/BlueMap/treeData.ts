import type { TreeDataNode } from "antd";

// 静态数据
export const defaultData: TreeDataNode[] = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
        ],
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0", key: "0-1-0" },
      { title: "0-1-1", key: "0-1-1" },
    ],
  },
];
