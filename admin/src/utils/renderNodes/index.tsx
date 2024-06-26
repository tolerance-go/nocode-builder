import { components } from "@/configs/components";
import { NodeData, RouteNodeData } from "@/types";
import React from "react";
import { DeepReadonly } from "../types";
import { isRouteNodeData } from "../isRouteNodeData";

export function renderNodes(
  nodeDataArray: DeepReadonly<NodeData[]>,
  renderRouteNode: (routeNodeData: RouteNodeData) => React.ReactNode
): React.ReactNode {
  return nodeDataArray.map((nodeData) => {
    if (isRouteNodeData(nodeData)) {
      return renderRouteNode(nodeData);
    }

    const Component = components[nodeData.elementType];

    if (!Component) {
      console.error(`Unknown elementType: ${nodeData.elementType}`);
      return null;
    }

    let children: React.ReactNode | Record<string, React.ReactNode>;
    if (Array.isArray(nodeData.children)) {
      children = renderNodes(nodeData.children as NodeData[], renderRouteNode);
    } else if (
      nodeData.children &&
      typeof nodeData.children === "object" &&
      nodeData.children !== null
    ) {
      // Handle SlotsChildren type
      children = Object.fromEntries(
        Object.entries(nodeData.children).map(([key, value]) => {
          return [
            key,
            Array.isArray(value) ? renderNodes(value, renderRouteNode) : value,
          ];
        })
      );
    } else {
      children = nodeData.children;
    }

    return (
      <Component
        key={nodeData.id}
        node={nodeData}
        style={nodeData.styles}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onMouseDown={() => {}}
        onMouseOver={() => {}}
        onClick={() => {}}
        data-node-id={""}
        data-type={""}
        _preview={true}
      >
        {children}
      </Component>
    );
  });
}
