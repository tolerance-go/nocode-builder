import { components } from "@/configs/components";
import { NodeData, SlotsChildren } from "@/types";
import React from "react";

function renderNodes(nodeDataArray: NodeData[]): React.ReactNode {
  return nodeDataArray.map((nodeData) => {
    const Component = components[nodeData.elementType];

    if (!Component) {
      console.error(`Unknown elementType: ${nodeData.elementType}`);
      return null;
    }

    let children: React.ReactNode;
    if (Array.isArray(nodeData.children)) {
      children = renderNodes(nodeData.children as NodeData[]);
    } else if (nodeData.children && typeof nodeData.children === "object") {
      // Handle SlotsChildren type
      children = Object.entries(nodeData.children as SlotsChildren).flatMap(
        ([, value]) => {
          if (Array.isArray(value)) {
            return renderNodes(value as NodeData[]);
          }
          return value;
        }
      );
    } else {
      children = nodeData.children as React.ReactNode;
    }

    const nodeStyle = nodeData.staticProps.style;

    return (
      <Component
        key={nodeData.id}
        node={nodeData}
        style={(nodeStyle as React.CSSProperties | undefined) || {}}
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

export default renderNodes;
