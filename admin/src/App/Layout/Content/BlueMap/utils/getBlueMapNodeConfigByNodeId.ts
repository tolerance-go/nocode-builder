import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { blueMapNodeConfigsByShape } from "../configs/configs";
import { getNodeById } from "./getNodeById";

export const getBlueMapNodeConfigByNodeId = (nodeId: string, graph: Graph) => {
  const node = getNodeById(graph, nodeId);

  const blueMapNodeConfig = blueMapNodeConfigsByShape.get(node.shape);

  ensure(blueMapNodeConfig, "blueMapNodeConfig 对应 shape 不存在。");

  return blueMapNodeConfig;
};
