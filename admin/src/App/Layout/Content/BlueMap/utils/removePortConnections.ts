import { Graph } from "@antv/x6";

export const removePortConnections = (
  nodeId: string,
  portId: string,
  graph: Graph
) => {
  const node = graph.getCellById(nodeId);
  if (node && node.isNode()) {
    const edges = graph.getEdges();
    edges.forEach((edge) => {
      if (
        edge.getSourcePortId() === portId &&
        edge.getSourceCellId() === nodeId
      ) {
        graph.removeEdge(edge);
      }
      if (
        edge.getTargetPortId() === portId &&
        edge.getTargetCellId() === nodeId
      ) {
        graph.removeEdge(edge);
      }
    });
  }
};
