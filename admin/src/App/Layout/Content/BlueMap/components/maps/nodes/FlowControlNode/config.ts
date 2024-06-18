import { FlowControlNode } from ".";
import { generateBlueMapConfigs } from "../../base/generateBlueMapConfigs";
import { BlueMapNodeConfig } from "../../base/types";

export const _FlowControlNodeConfig: BlueMapNodeConfig = {
  type: "flowControl",
  component: FlowControlNode,
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

export const FlowControlNodeConfigs = generateBlueMapConfigs(
  _FlowControlNodeConfig
);
