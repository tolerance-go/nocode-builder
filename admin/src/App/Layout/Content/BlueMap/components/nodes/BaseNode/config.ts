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
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: "#31d0c6",
            fill: "#fff",
            strokeWidth: 2,
          },
          portLabel: {
            type: "BasePortLabel",
          },
        },
        label: {
          position: "right",
          markup: Markup.getForeignObjectMarkup(),
        },
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: "#31d0c6",
            fill: "#fff",
            strokeWidth: 2,
          },
          portLabel: {
            type: "BasePortLabel",
          },
        },
        label: {
          position: "left",
          markup: Markup.getForeignObjectMarkup(),
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
            text: "text1",
          },
          portLabel: {
            type: "BasePortLabel",
          },
        },
      },
      {
        id: "port_34",
        group: "left",
        attrs: {
          text: {
            text: "text1",
          },
          portLabel: {
            type: "BasePortLabel",
          },
        },
      },
      {
        id: "port_4",
        group: "right",
        attrs: {
          text: {
            text: "text1",
          },
          portLabel: {
            type: "BasePortLabel",
          },
        },
      },
    ],
  },
};
