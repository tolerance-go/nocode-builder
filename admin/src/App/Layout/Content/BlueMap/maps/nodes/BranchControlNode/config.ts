import { BranchControlNode, BranchControlNodeAttrs } from ".";
import { generateBlueMapConfigMeta } from "../../../core/generateBlueMapConfigMeta";
import { BlueMapNodeConfig } from "../../../types";

export const BranchControlBlueMapNodeConfig: BlueMapNodeConfig<BranchControlNodeAttrs> =
  {
    menu: {
      groupType: ["flow-control"],
      title: "分支",
      key: "branch",
    },
    id: "BranchControlNode",
    shapeName: "branch-control-node",
    type: "flowControl",
    component: BranchControlNode,
    connections: {
      left: {
        ports: [
          {
            id: "entry",
            type: "exec",
          },
        ],
      },
      right: {
        ports: [
          {
            id: "truth",
            type: "exec",
            args: {
              text: "真",
            },
          },
          {
            id: "false",
            type: "exec",
            args: {
              text: "假",
            },
          },
        ],
      },
    },
  };

export const BranchControlNodeConfigMeta = generateBlueMapConfigMeta(
  BranchControlBlueMapNodeConfig
);
