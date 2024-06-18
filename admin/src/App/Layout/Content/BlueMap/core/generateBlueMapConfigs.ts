import { typedKeys } from "@/utils/typedKeys";
import { Cell } from "@antv/x6";
import { PortLayout } from "@antv/x6/es/registry/port-layout";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { BlueMapConnectPort, BlueMapNodeConfig, NodeConfig } from "../types";
import { ArrowPortConfig } from "../components/ports/ArrowPort/config";
import { BasePortConfig } from "../components/ports/BasePort/config";

// 提取间距常量
const PORT_SPACING = 20;
const HEADER_HEIGHT = 50;
const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;
const PORT_GROUP_SPACING = 10;
const DEFAULT_FO_WIDTH = 50;
const DEFAULT_FO_HEIGHT = 50;
const PADDING_X = 10;

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
            width: connection.width ?? DEFAULT_FO_WIDTH,
            height: connection.height ?? DEFAULT_FO_HEIGHT,
            x:
              group === "right"
                ? -(connection.width ?? DEFAULT_FO_WIDTH) - PADDING_X
                : PADDING_X,
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
  const leftPortWidthSum =
    config.connections.left?.ports.reduce(
      (max, port) => Math.max(max, port.width ?? DEFAULT_FO_WIDTH),
      0
    ) ?? 0;

  const rightPortWidthSum =
    config.connections.right?.ports.reduce(
      (max, port) => Math.max(max, port.width ?? DEFAULT_FO_WIDTH),
      0
    ) ?? 0;

  const portWidthSum = leftPortWidthSum + rightPortWidthSum;

  const leftPortHeightSum =
    config.connections.left?.ports.reduce(
      (sum, port) =>
        sum + (port.height ?? DEFAULT_FO_HEIGHT) + PORT_GROUP_SPACING,
      0
    ) ?? 0;
  const rightPortHeightSum =
    config.connections.right?.ports.reduce(
      (sum, port) =>
        sum + (port.height ?? DEFAULT_FO_HEIGHT) + PORT_GROUP_SPACING,
      0
    ) ?? 0;

  const maxPortHeightSum = Math.max(leftPortHeightSum, rightPortHeightSum);

  const shapeConfig: ReactShapeConfig = {
    shape: config.shapeName,
    width: Math.max(MIN_WIDTH, portWidthSum + PADDING_X * 2 + PORT_SPACING),
    height: Math.max(MIN_HEIGHT, maxPortHeightSum + HEADER_HEIGHT),
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
              width: DEFAULT_FO_WIDTH,
              height: DEFAULT_FO_HEIGHT,
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
              width: DEFAULT_FO_WIDTH,
              height: DEFAULT_FO_HEIGHT,
              x: -DEFAULT_FO_WIDTH,
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
