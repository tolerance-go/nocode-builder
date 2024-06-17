import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNode } from ".";
import { NodeConfig } from "../../../types";

export const BaseNodeShape: ReactShapeConfig = {
  shape: "base-node",
  width: 300,
  height: 400,
  component: BaseNode,
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
        zIndex: 1,
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
        zIndex: 1,
      },
    },
  },
};

export const BaseNodeConfig: NodeConfig = {
  id: "BaseNode",
  shape: BaseNodeShape.shape,
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
