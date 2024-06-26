import { NodeData, RouteNodeData } from "@/types";
import { DeepReadonly } from "./types";

export function isRouteNodeData(
  nodeData: DeepReadonly<NodeData>
): nodeData is RouteNodeData {
  return nodeData.elementType === "Route";
}
