import { blueMapPortConfigsByType } from "@/configs/blueMap/blueMapPortConfigs";
import { BlueMapPortMeta, PortBlueMapAttrs } from "@/types";
import { ensure } from "@/utils/ensure";
import { Node } from "@antv/x6";

export const getBlueMapPortMetaByPortId = (
  portId: string,
  node: Node
): BlueMapPortMeta => {
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
