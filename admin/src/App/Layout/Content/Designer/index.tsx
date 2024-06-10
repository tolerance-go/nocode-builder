import stores from "@/stores";
import { Node, NodeData, NodePlainChild } from "@/stores/designs";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/ensure/types";
import React from "react";
import { useSnapshot } from "valtio";

const components: {
  [key in string]?: string;
} = {
  div: "div",
  span: "span",
  text: "text",
};

// 类型断言函数
const isPrimitiveOrNull = (
  value: unknown
): value is string | number | boolean | undefined | null => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === undefined ||
    value === null
  );
};

const RenderNode: React.FC<{ node: DeepReadonly<NodeData> }> = ({ node }) => {
  const Component = components[node.elementType]; // Default to div if elementType is not found

  if (!Component) {
    throw new Error("未知组件类型");
  }

  if (Component === components.text) {
    ensure(
      isPrimitiveOrNull(node.children),
      "text 类型的元素的 child 不合法。"
    );
    return node.children as NodePlainChild;
  }

  return React.createElement(Component, {
    ...node.staticProps,
    children: isPrimitiveOrNull(node.children)
      ? node.children
      : node.children?.map((childNode) => (
          <RenderNode key={childNode.id} node={childNode} />
        )),
  });
};

export const Designer: React.FC = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <>
      {designTreeData.nodeData.map((node) => (
        <RenderNode key={node.id} node={node} />
      ))}
    </>
  );
};
