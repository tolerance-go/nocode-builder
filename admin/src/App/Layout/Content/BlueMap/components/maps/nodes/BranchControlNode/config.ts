import { BranchControlNode, BranchControlNodeAttrs } from ".";
import { BlueMapNodeConfig } from "../../../../types";
import { generateBlueMapConfigs } from "../../base/generateBlueMapConfigs";

export const BranchControlBlueMapNodeConfig: BlueMapNodeConfig<BranchControlNodeAttrs> =
  {
    id: "BranchControlNode",
    shapeName: "branch-control-node",
    type: "flowControl",
    component: BranchControlNode,
    connections: {
      left: [
        {
          id: "entry",
          type: "exec",
        },
      ],
      right: [
        {
          id: "truth",
          type: "exec",
        },
        {
          id: "false",
          type: "exec",
        },
      ],
    },
  };

export const BranchControlNodeConfigs = generateBlueMapConfigs(
  BranchControlBlueMapNodeConfig
);
