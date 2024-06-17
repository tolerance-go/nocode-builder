import { SearchTreeNode } from "./types";

// 静态数据
export const defaultData: SearchTreeNode[] = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            configId: "BaseNode",
            title: "0-0-0-0",
            key: "0-0-0-0",
          },
          {
            configId: "BaseNode",

            title: "0-0-0-1",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            configId: "BaseNode",
            title: "0-0-1-0",
            key: "0-0-1-0",
          },
          {
            configId: "BaseNode",
            title: "0-0-1-1",
            key: "0-0-1-1",
          },
        ],
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      {
        configId: "BaseNode",
        title: "0-1-0",
        key: "0-1-0",
      },
      {
        configId: "BaseNode",
        title: "0-1-1",
        key: "0-1-1",
      },
    ],
  },
];
