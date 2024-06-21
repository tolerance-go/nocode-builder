import { ensure } from "@/utils/ensure";
import { blueMapPortConfigsByType } from "../configs/configs";
import { PortBlueMapAttrs } from "../types";
import { Node } from "@antv/x6";

export const getBlueMapPortMetaByPortId = (portId: string, node: Node) => {
  const ports = node.getPorts();
  const port = ports.find((p) => p.id === portId);
  ensure(port, "port 必须存在。");
  const portBlueMapAttrs = port.attrs?.blueMap as PortBlueMapAttrs | undefined;
  ensure(portBlueMapAttrs, "portBlueMapAttrs 必须存在。");
  const portType = portBlueMapAttrs.type;
  const blueMapPortConfig = blueMapPortConfigsByType.get(portType);
  ensure(blueMapPortConfig, "blueMapPortConfig 必须存在。");
  return { portBlueMapAttrs, blueMapPortConfig };
};
