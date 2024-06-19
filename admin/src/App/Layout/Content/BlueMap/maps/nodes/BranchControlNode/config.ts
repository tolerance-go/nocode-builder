import { BranchControlNode, BranchControlNodeAttrs } from ".";
import { BlueMapNodeConfig } from "../../../types";
import { generateBlueMapConfigs } from "../../../core/generateBlueMapConfigs";

export const BranchControlBlueMapNodeConfig: BlueMapNodeConfig<BranchControlNodeAttrs> =
  {
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

export const BranchControlNodeConfigs = generateBlueMapConfigs(
  BranchControlBlueMapNodeConfig
);
