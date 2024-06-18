import { ReactShapeConfig } from "@antv/x6-react-shape";
import { NodeConfig } from "../../../../types";
import { FlowControlNode } from ".";
import { BlueMapNodeConfig } from "../../base/types";

export const _FlowControlNodeConfig: BlueMapNodeConfig = {
  type: "flowControl",
  connections: {
    left: [
      {
        type: "exec",
      },
    ],
    right: [
      {
        type: "exec",
      },
      {
        type: "exec",
      },
    ],
  },
};

export const FlowControlNodeShape: ReactShapeConfig = {
  shape: "base-node",
  width: 300,
  height: 400,
  component: FlowControlNode,
  ports: {
    groups: {
      left: {
        position: "left",
        attrs: {
          fo: {
            magnet: "true",
            width: 50,
            height: 50,
            y: -25,
          },
          port: {
            type: "BasePort",
          },
        },
      },
      right: {
        position: "right",
        attrs: {
          fo: {
            magnet: "true",
            width: 50,
            height: 50,
            y: -25,
            x: -50,
          },
          port: {
            type: "BasePort",
          },
        },
      },
    },
  },
};

export const FlowControlNodeConfig: NodeConfig = {
  id: "FlowControlNode",
  shape: FlowControlNodeShape.shape,
  ports: {
    items: [
      {
        id: "port_3",
        group: "left",
        attrs: {},
      },
      {
        id: "port_34",
        group: "left",
        attrs: {},
      },
      {
        id: "port_4",
        group: "right",
        attrs: {},
      },
    ],
  },
};
