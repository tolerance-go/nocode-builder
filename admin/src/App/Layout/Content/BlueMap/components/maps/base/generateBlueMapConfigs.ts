import { typedKeys } from "@/utils/typedKeys";
import { Cell } from "@antv/x6";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { BlueMapNodeConfig, NodeConfig } from "../../../types";

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
export function generateBlueMapConfigs<
  Attrs extends Cell.Common["attrs"] = Cell.Common["attrs"]
>(
  config: BlueMapNodeConfig<Attrs>
): {
  shapeConfig: ReactShapeConfig;
  nodeConfig: NodeConfig<Attrs>;
} {
  const shapeConfig: ReactShapeConfig = {
    shape: config.shapeName,
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

  const nodeConfig: NodeConfig<Attrs> = {
    id: config.id,
    shape: shapeConfig.shape,
    ports: {
      items: convertConnectionsToPorts(config.connections),
    },
    attrs: config.attrs,
  };

  return { shapeConfig, nodeConfig };
}
