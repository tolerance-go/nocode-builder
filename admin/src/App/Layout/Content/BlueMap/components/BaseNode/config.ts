import { ReactShapeConfig } from "@antv/x6-react-shape";
import { BaseNode } from ".";
import { NodeConfig } from "../../types";
import { Markup } from "@antv/x6";

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
          label: {
            type: "TextPortLabel",
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
            magnet: true,
            stroke: "#8f8f8f",
            r: 5,
          },
          label: {
            type: "TextPortLabel",
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
            text: "1",
          },
          label: {
            type: "TextPortLabel",
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
          label: {
            type: "TextPortLabel",
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
          label: {
            type: "TextPortLabel",
          },
        },
      },
    ],
  },
};
