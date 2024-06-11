import stores from "@/stores";
import { NodeData, NodePlainChild } from "@/stores/designs";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/ensure/types";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

const Custom = (props: DesignableComponentProps) => {
  return (
    <div {...props}>
      <Button>自定义按钮</Button>
    </div>
  );
};

type DesignableComponentProps = {
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
};

type ComponentType =
  | React.FC<
      {
        children?: React.ReactNode;
      } & DesignableComponentProps
    >
  | string;

const components: {
  [key in string]?: ComponentType;
} = {
  div: "div",
  span: "span",
  text: "text",
  Custom: Custom,
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

  const handleMouseEnter = () => {
    stores.designs.actions.switchHoveredComponent(node.id, true);
  };
  const handleMouseOver = (event: React.MouseEvent) => {
    /** 禁止冒泡 */
    event.stopPropagation();

    if (dragging.draggingId) {
      /** 如果拖拽的时候悬停是自己，就取消 */
      if (dragging.draggingId === node.id) {
        onDraggingHover(null);
        return;
      }

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
      background: isDragging
        ? "#eee"
        : (node.staticProps.style?.background as string),
      border: isHighlighted
        ? "1px solid blue"
        : (node.staticProps.style?.border as string), // 这里使用简单的边框来高亮，可以根据需求调整
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
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
  const [draggingHoveredNode, setDraggingHoveredNode] =
    useState<HTMLElement | null>(null);
  const [highlightedDiv, setHighlightedDiv] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const PROXIMITY_THRESHOLD = 20; // Define the proximity threshold

  const handleDraggingHover = (node: HTMLElement | null) => {
    setDraggingHoveredNode(node);
  };

  const floatingDivsStyle = (
    position: { top: number; left: number },
    isHighlighted: boolean
  ) => ({
    position: "absolute" as const,
    top: position.top,
    left: position.left,
    width: "10px",
    height: "10px",
    backgroundColor: isHighlighted ? "red" : "rgba(0,0,0,0.5)",
  });

  const handleMouseMove = (event: MouseEvent) => {
    if (!draggingHoveredNode || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const positions = [
      {
        top: draggingHoveredNode.offsetTop - 10,
        left:
          draggingHoveredNode.offsetLeft +
          draggingHoveredNode.offsetWidth / 2 -
          5,
      },
      {
        top: draggingHoveredNode.offsetTop + draggingHoveredNode.offsetHeight,
        left:
          draggingHoveredNode.offsetLeft +
          draggingHoveredNode.offsetWidth / 2 -
          5,
      },
      {
        top:
          draggingHoveredNode.offsetTop +
          draggingHoveredNode.offsetHeight / 2 -
          5,
        left: draggingHoveredNode.offsetLeft - 10,
      },
      {
        top:
          draggingHoveredNode.offsetTop +
          draggingHoveredNode.offsetHeight / 2 -
          5,
        left: draggingHoveredNode.offsetLeft + draggingHoveredNode.offsetWidth,
      },
    ];

    let newHighlightedDiv = null;

    positions.forEach((pos, index) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - (pos.left + 5), 2) + // 5 is half the width of the floating div
          Math.pow(mouseY - (pos.top + 5), 2) // 5 is half the height of the floating div
      );

      if (distance < PROXIMITY_THRESHOLD) {
        newHighlightedDiv = index;
      }
    });

    setHighlightedDiv(newHighlightedDiv);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draggingHoveredNode]);

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      {designTreeData.nodeData.map((node) => (
        <RenderNode
          key={node.id}
          node={node}
          onDraggingHover={handleDraggingHover}
        />
      ))}
      {draggingHoveredNode && (
        <>
          <div
            style={floatingDivsStyle(
              {
                top: draggingHoveredNode.offsetTop - 10,
                left:
                  draggingHoveredNode.offsetLeft +
                  draggingHoveredNode.offsetWidth / 2 -
                  5,
              },
              highlightedDiv === 0
            )}
          ></div>
          <div
            style={floatingDivsStyle(
              {
                top:
                  draggingHoveredNode.offsetTop +
                  draggingHoveredNode.offsetHeight,
                left:
                  draggingHoveredNode.offsetLeft +
                  draggingHoveredNode.offsetWidth / 2 -
                  5,
              },
              highlightedDiv === 1
            )}
          ></div>
          <div
            style={floatingDivsStyle(
              {
                top:
                  draggingHoveredNode.offsetTop +
                  draggingHoveredNode.offsetHeight / 2 -
                  5,
                left: draggingHoveredNode.offsetLeft - 10,
              },
              highlightedDiv === 2
            )}
          ></div>
          <div
            style={floatingDivsStyle(
              {
                top:
                  draggingHoveredNode.offsetTop +
                  draggingHoveredNode.offsetHeight / 2 -
                  5,
                left:
                  draggingHoveredNode.offsetLeft +
                  draggingHoveredNode.offsetWidth,
              },
              highlightedDiv === 3
            )}
          ></div>
        </>
      )}
    </div>
  );
};
