import { Node } from "@antv/x6";
import { getBlueMapPortMetaByPortId } from "./getBlueMapPortMetaByPortId";

export const getBlueMapPortConfigByPortId = (portId: string, node: Node) => {
  const { blueMapPortConfig } = getBlueMapPortMetaByPortId(portId, node);

  return blueMapPortConfig;
};
