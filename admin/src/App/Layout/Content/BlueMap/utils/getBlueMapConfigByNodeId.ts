import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";
import { blueMapNodeConfigsByShape } from "../configs/configs";

export const getBlueMapConfigByNodeId = (graph: Graph, nodeId: string) => {
  const cell = graph.getCellById(nodeId);

  ensure(cell.isNode(), "nodeId 对应的 cell 不是 Node。");

  const node = cell;

  const blueMapNodeConfig = blueMapNodeConfigsByShape.get(node.shape);

  ensure(blueMapNodeConfig, "blueMapNodeConfig 对应 shape 不存在。");

  return blueMapNodeConfig;
};
