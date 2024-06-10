import stores from "@/stores";
import { Node } from "@/stores/designs";
import { DeepReadonly } from "@/utils/ensure/types";
import React from "react";
import { useSnapshot } from "valtio";

const components: {
  [key in string]?: string;
} = {
  div: "div",
  span: "span",
};

const RenderNode: React.FC<{ node: DeepReadonly<Node> }> = ({ node }) => {
  const Component = components[node.elementType] || "div"; // Default to div if elementType is not found

  return React.createElement(Component, {
    ...node.staticProps,
    children: node.children?.map((childNode) =>
      typeof childNode === "string" ||
      typeof childNode === "number" ||
      typeof childNode === "boolean" ||
      childNode === undefined ||
      childNode === null ? (
        childNode
      ) : (
        <RenderNode key={childNode.id} node={childNode} />
      )
    ),
  });
};

export const Designer: React.FC = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <div>
      {designTreeData.nodeData?.map((node) =>
        typeof node === "string" ||
        typeof node === "number" ||
        typeof node === "boolean" ||
        node === undefined ||
        node === null ? (
          node
        ) : (
          <RenderNode key={node.id} node={node} />
        )
      )}
    </div>
  );
};
