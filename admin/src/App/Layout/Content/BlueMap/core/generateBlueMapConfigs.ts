import { typedKeys } from "@/utils/typedKeys";
import { Cell } from "@antv/x6";
import { ReactShapeConfig } from "@antv/x6-react-shape";
import { PortManager } from "@antv/x6/es/model/port";
import { PortLayout } from "@antv/x6/es/registry/port-layout";
import { BasePortConfig } from "../components/ports/BasePort/config";
import { BlueMapNodeConfig, NodeConfig } from "../types";

// 左右中间的间距
const PORT_SPACING = 20;
const HEADER_HEIGHT = 40;
const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;
/** 纵向连接桩的间距 */
const PORT_GROUP_SPACING = 10;
const DEFAULT_FO_WIDTH = 100;
const DEFAULT_FO_HEIGHT = 50;
const PADDING_X = 10;

function convertConnectionsToPorts(
  connections: BlueMapNodeConfig["connections"]
): PortManager.PortMetadata[] {
  const ports: PortManager.PortMetadata[] = [];

  typedKeys(connections).forEach((group) => {
    connections[group]?.ports.forEach((blueMapPort) => {
      ports.push({
        id: blueMapPort.id,
        group,
        attrs: {
          fo: {
            magnet: "true",
            width: blueMapPort.width ?? DEFAULT_FO_WIDTH,
            height: blueMapPort.height ?? DEFAULT_FO_HEIGHT,
            x:
              group === "right"
                ? -(blueMapPort.width ?? DEFAULT_FO_WIDTH) - PADDING_X
                : PADDING_X,
          },
          blueMapPort: {
            type: blueMapPort.type,
            args: blueMapPort.args,
          },
        },
        args: {
          height: blueMapPort.height ?? DEFAULT_FO_HEIGHT,
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
            name: "fromTopToBottom",
            args: {
              position: "left",
              offsetTop: HEADER_HEIGHT,
              gap: PORT_GROUP_SPACING,
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
            name: "fromTopToBottom",
            args: {
              position: "right",
              offsetTop: HEADER_HEIGHT,
              gap: PORT_GROUP_SPACING,
            } as PortLayout.CommonArgs,
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
