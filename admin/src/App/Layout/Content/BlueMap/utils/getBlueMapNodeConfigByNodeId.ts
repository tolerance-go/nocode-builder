import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { blueMapRawNodeConfigsByShape } from "../configs/configs";
import { getNodeById } from "./getNodeById";

export const getBlueMapNodeConfigByNodeId = (nodeId: string, graph: Graph) => {
  const node = getNodeById(nodeId, graph);

  const blueMapNodeConfig = blueMapRawNodeConfigsByShape.get(node.shape);

  ensure(blueMapNodeConfig, "blueMapNodeConfig 对应 shape 不存在。");

  return blueMapNodeConfig;
};
