import { ReactShapeConfig } from "@antv/x6-react-shape";
import { NodeConfig } from "../../../types";
import { BlueMapNodeConfig } from "./types";
import { PortManager } from "@antv/x6/es/model/port";
import { typedKeys } from "@/utils/typedKeys";

function convertConnectionsToPorts(
  connections: BlueMapNodeConfig["connections"]
): PortManager.PortMetadata[] {
  const ports: PortManager.PortMetadata[] = [];

  typedKeys(connections).forEach((group) => {
    connections[group]?.forEach((connection) => {
      ports.push({
        id: connection.id,
        group: group,
        attrs: {},
      });
    });
  });

  return ports;
}
export function generateBlueMapConfigs(config: BlueMapNodeConfig): {
  shapeConfig: ReactShapeConfig;
  nodeConfig: NodeConfig;
} {
  const shapeConfig: ReactShapeConfig = {
    shape: "base-node",
    width: 300,
    height: 400,
    component: config.component,
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

  const nodeConfig: NodeConfig = {
    id: "FlowControlNode",
    shape: shapeConfig.shape,
    ports: {
      items: convertConnectionsToPorts(config.connections),
    },
  };

  return { shapeConfig, nodeConfig };
}
