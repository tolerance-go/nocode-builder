import stores from "@/stores";
import { NodeData, NodePlainChild } from "@/stores/designs";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/ensure/types";
import React, { useEffect, useState } from "react";
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

const RenderNode: React.FC<{
  node: DeepReadonly<NodeData>;
  /**
   * 拖拽的时候，悬停的 node 的 html 元素，不包括自身
   * 
   * @param node 
   * @returns 
   */
  onDraggingHover: (node: HTMLElement | null) => void;
}> = ({ node, onDraggingHover }) => {
  const hoveredComponents = useSnapshot(
    stores.designs.states.hoveredComponents
  );
  const dragging = useSnapshot(stores.designs.states.dragging);
  const isDragging = dragging.draggingId === node.id;

  const isHighlighted = hoveredComponents.ids.includes(node.id);

  const handleMouseEnter = (event: React.MouseEvent) => {
    stores.designs.actions.switchHoveredComponent(node.id, true);

    if (dragging.draggingId) {
      onDraggingHover(event.currentTarget as HTMLElement);
    }
  };
  const handleMouseLeave = () => {
    stores.designs.actions.switchHoveredComponent(node.id, false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    stores.designs.actions.startDragging(node.id);
  };

  const handleMouseMove = () => {};

  const handleMouseUp = () => {
    stores.designs.actions.stopDragging();

    onDraggingHover(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const Component = components[node.elementType]; // Default to div if elementType is not found

  ensure(!!Component, "未知组件类型。");

  if (Component === components.text) {
    ensure(
      isPrimitiveOrNull(node.children),
      "text 类型的元素的 child 不合法。"
    );
    return node.children as NodePlainChild;
  }

  ensure(
    !!node.staticProps.style && typeof node.staticProps.style === "object",
    "node.staticProps.style 类型不是对象。"
  );

  return React.createElement(Component, {
    ...node.staticProps,
    style: {
      ...node.staticProps.style,
      background: isDragging ? "#eee" : undefined,
      border: isHighlighted ? "1px solid blue" : undefined, // 这里使用简单的边框来高亮，可以根据需求调整
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    children: isPrimitiveOrNull(node.children)
      ? node.children
      : node.children?.map((childNode) => (
          <RenderNode
            key={childNode.id}
            node={childNode}
            onDraggingHover={onDraggingHover}
          />
        )),
  });
};

export const Designer: React.FC = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);
  const [hoveredNode, setHoveredNode] = useState<HTMLElement | null>(null);

  const handleDraggingHover = (node: HTMLElement | null) => {
    setHoveredNode(node);
  };

  const floatingDivsStyle = (position: { top: number; left: number }) => ({
    position: "absolute" as const,
    top: position.top,
    left: position.left,
    width: "10px",
    height: "10px",
    backgroundColor: "rgba(0,0,0,0.5)",
  });

  return (
    <div style={{ position: "relative" }}>
      {designTreeData.nodeData.map((node) => (
        <RenderNode
          key={node.id}
          node={node}
          onDraggingHover={handleDraggingHover}
        />
      ))}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {hoveredNode && (
        <>
          <div
            style={floatingDivsStyle({
              top: hoveredNode.offsetTop - 10,
              left: hoveredNode.offsetLeft + hoveredNode.offsetWidth / 2 - 5,
            })}
          ></div>
          <div
            style={floatingDivsStyle({
              top: hoveredNode.offsetTop + hoveredNode.offsetHeight,
              left: hoveredNode.offsetLeft + hoveredNode.offsetWidth / 2 - 5,
            })}
          ></div>
          <div
            style={floatingDivsStyle({
              top: hoveredNode.offsetTop + hoveredNode.offsetHeight / 2 - 5,
              left: hoveredNode.offsetLeft - 10,
            })}
          ></div>
          <div
            style={floatingDivsStyle({
              top: hoveredNode.offsetTop + hoveredNode.offsetHeight / 2 - 5,
              left: hoveredNode.offsetLeft + hoveredNode.offsetWidth,
            })}
          ></div>
        </>
      )}
    </div>
  );
};
