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
      input: {
        ports: [
          {
            id: "entry",
            type: "exec",
          },
          {
            id: "condition",
            type: "condition",
            args: {
              text: "表达式",
            },
          },
        ],
      },
      output: {
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
