import { BranchControlNodeConfigs } from "./components/maps/BranchControlNode/config";
import { SearchTreeNode } from "./types";

// 静态数据
export const defaultData: SearchTreeNode[] = [
  {
    title: "控制流",
    key: "flow-control",
    selectable: false,
    children: [
      {
        title: "分支",
        key: "branch",
        configId: BranchControlNodeConfigs.nodeConfig.id,
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        selectable: false,
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
    selectable: false,
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
