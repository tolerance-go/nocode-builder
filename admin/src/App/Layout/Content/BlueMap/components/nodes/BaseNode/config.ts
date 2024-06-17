import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNode } from ".";
import { Markup } from "@antv/x6";
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
        markup: Markup.getForeignObjectMarkup(),
        attrs: {
          label: {
            type: "BasePortLabel",
          },
          port: {
            type: "BasePort",
          },
        },
      },
      right: {
        position: "right",
        markup: Markup.getForeignObjectMarkup(),
        attrs: {
          port: {
            type: "BasePort",
          },
          label: {
            type: "BasePortLabel",
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
          label: {
            type: "BasePortLabel",
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
          label: {
            type: "BasePortLabel",
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
          label: {
            type: "BasePortLabel",
          },
          port: {
            type: "BasePort",
          },
        },
      },
    ],
  },
};
