import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNode } from ".";
import { NodeConfig } from "../../types";

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
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5,
          },
        },
        label: {
          position: "right",
        },
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            magnet: true,
            stroke: "#8f8f8f",
            r: 5,
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
          text: {
            text: "1",
          },
        },
      },
      {
        id: "port_34",
        group: "left",
        attrs: {
          text: {
            text: "1",
          },
        },
      },
      {
        id: "port_4",
        group: "right",
        attrs: {
          text: {
            text: "1",
          },
        },
      },
    ],
  },
};
