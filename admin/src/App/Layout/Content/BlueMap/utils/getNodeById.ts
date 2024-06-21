import { ensure } from "@/utils/ensure";
import { Graph } from "@antv/x6";

export const getNodeById = (nodeId: string, graph: Graph) => {
  const cell = graph.getCellById(nodeId);

  ensure(cell.isNode(), "nodeId 对应的 cell 不是 Node。");

  return cell;
};
