import { FlowControlNode, FlowControlNodeAttrs } from ".";
import { BlueMapNodeConfig } from "../../../../types";
import { generateBlueMapConfigs } from "../../base/generateBlueMapConfigs";

export const _FlowControlNodeConfig: BlueMapNodeConfig<FlowControlNodeAttrs> = {
  id: "FlowControlNode",
  shapeName: "flow-control-node",
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
