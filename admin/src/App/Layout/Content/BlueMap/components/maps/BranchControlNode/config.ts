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
            width: 100,
            height: 100,
          },
        ],
      },
      right: {
        ports: [
          {
            id: "truth",
            type: "exec",
            args: {
              text: "为真",
            },
            width: 100,
            height: 100,
          },
          {
            id: "false",
            type: "exec",
            args: {
              text: "为假",
            },
            width: 100,
            height: 100,
          },
        ],
      },
    },
  };

export const BranchControlNodeConfigs = generateBlueMapConfigs(
  BranchControlBlueMapNodeConfig
);
