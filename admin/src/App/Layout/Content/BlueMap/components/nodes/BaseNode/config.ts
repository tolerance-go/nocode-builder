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
          port: {
            type: "BasePort",
          },
        },
        zIndex: 1,
      },
      right: {
        position: "right",
        attrs: {
          port: {
            type: "BasePort",
          },
        },
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
        attrs: {
          fo: {
            magnet: "true",
          },
          port: {
            type: "BasePort",
          },
        },
      },
      {
        id: "port_34",
        group: "left",
        attrs: {
          fo: {
            magnet: "true",
          },
          port: {
            type: "BasePort",
          },
        },
      },
      {
        id: "port_4",
        group: "right",
        attrs: {
          fo: {
            magnet: "true",
          },
          port: {
            type: "BasePort",
          },
        },
      },
    ],
  },
};
