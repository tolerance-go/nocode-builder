import { typedKeys } from "@/utils/typedKeys";
import { Cell } from "@antv/x6";
import { PortLayout } from "@antv/x6/es/registry/port-layout";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { BlueMapConnectPort, BlueMapNodeConfig, NodeConfig } from "../types";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";

const getPort = (connection: BlueMapConnectPort) => {
  if (connection.type === "exec") {
    return ArrowPortConfig.id;
  }
  return BasePortConfig.id;
};

function convertConnectionsToPorts(
  connections: BlueMapNodeConfig["connections"]
): PortManager.PortMetadata[] {
  const ports: PortManager.PortMetadata[] = [];

  typedKeys(connections).forEach((group) => {
    connections[group]?.ports.forEach((connection) => {
      ports.push({
        id: connection.id,
        group,
        attrs: {
          fo: {
            magnet: "true",
            width: connection.width ?? 50,
            height: connection.height ?? 50,
            y: -((connection.height ?? 50) / 2),
            x: group === "right" ? -(connection.width ?? 50) : 0,
          },
          port: {
            id: getPort(connection),
            args: connection.args ?? {},
          },
        },
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
          position: {
            name: "leftTop",
            args: {
              offsetTop: config.connections.left?.offsetTop,
            } as PortLayout.CommonArgs,
          },
          attrs: {
            fo: {
              magnet: "true",
              width: 50,
              height: 50,
              y: -25,
            },
            port: {
              id: BasePortConfig.id,
            },
          },
        },
        right: {
          position: {
            name: "rightTop",
          },
          attrs: {
            fo: {
              magnet: "true",
              width: 50,
              height: 50,
              y: -25,
              x: -50,
            },
            port: {
              id: BasePortConfig.id,
            },
          },
        },
      },
    },
  };

  const nodeConfig: NodeConfig<Attrs> = {
    id: config.id,
    shapeName: shapeConfig.shape,
    shape: shapeConfig,
    ports: {
      items: convertConnectionsToPorts(config.connections),
    },
    attrs: config.attrs,
  };

  return { shapeConfig, nodeConfig };
}
