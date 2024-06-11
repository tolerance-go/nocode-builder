import useLatest from "@/hooks/useLatest";
import stores from "@/stores";
import { NodeData, NodePlainChild } from "@/stores/designs";
import { VisualPosition } from "@/types";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/ensure/types";
import { InsertionAnalyzer } from "@/utils/insertionAnalyzer";
import { isPlainObject } from "@/utils/isPlainObject";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

const Custom = ({ children, ...rest }: DesignableComponentProps) => {
  ensure(!isPlainObject(children), "children 类型是 ReactNode。");

  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      {children}
    </div>
  );
};

const CustomWithSlots = ({ children, ...rest }: DesignableComponentProps) => {
  ensure(isPlainObject(children), "children 类型是对象");

  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      <div>
        left:
        {children.left}
      </div>
      <div>
        left:
        {children.right}
      </div>
    </div>
  );
};

type DesignableComponentProps = {
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
  children?: React.ReactNode | Record<string, React.ReactNode>;
};

type ComponentType = React.FC<DesignableComponentProps> | string;

const components: {
  [key in string]?: ComponentType;
} = {
  div: "div",
  span: "span",
  text: "text",
  Custom: Custom,
  CustomWithSlots,
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
  onDraggingHover: (
    node: [DeepReadonly<NodeData>, HTMLElement],
    isHoverSelf?: boolean
  ) => void;
  /**
   * 当拖拽停止的时候
   */
  onDraggingEnd: () => void;
  /**
   * 当拖拽开始的时候
   */
  onDraggingStart: (node: [DeepReadonly<NodeData>, HTMLElement]) => void;
}> = ({ node, onDraggingHover, onDraggingEnd, onDraggingStart }) => {
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
        onDraggingHover([node, event.currentTarget as HTMLElement], true);
        return;
      }

      onDraggingHover([node, event.currentTarget as HTMLElement]);
    }
  };
  const handleMouseLeave = () => {
    stores.designs.actions.switchHoveredComponent(node.id, false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    stores.designs.actions.startDragging(node.id);

    onDraggingStart([node, event.currentTarget as HTMLElement]);
  };

  const handleMouseMove = () => {};

  const handleMouseUp = () => {
    stores.designs.actions.stopDragging();

    onDraggingEnd();
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

  const getChildren = () => {
    if (isPrimitiveOrNull(node.children)) {
      return node.children;
    }

    if (isPlainObject(node.children)) {
      return Object.entries(node.children).reduce((acc, [slot, children]) => {
        return {
          ...acc,
          [slot]: (Array.isArray(children) ? children : [children]).map(
            (childNode) => (
              <RenderNode
                key={childNode.id}
                node={childNode}
                onDraggingHover={onDraggingHover}
                onDraggingEnd={onDraggingEnd}
                onDraggingStart={onDraggingStart}
              />
            )
          ),
        };
      }, {});
    }

    return node.children?.map((childNode) => (
      <RenderNode
        key={childNode.id}
        node={childNode}
        onDraggingHover={onDraggingHover}
        onDraggingEnd={onDraggingEnd}
        onDraggingStart={onDraggingStart}
      />
    ));
  };

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
    children: getChildren(),
  });
};

export const Designer: React.FC = () => {
  // const insertionAnalyzer = useState(() => new InsertionAnalyzer());

  const designTreeData = useSnapshot(stores.designs.states.designTreeData);
  const [draggingHoveredOtherNode, setDraggingHoveredOtherNode] = useState<
    [DeepReadonly<NodeData>, HTMLElement] | null
  >(null);
  const [draggingNode, setDraggingNode] = useState<
    [DeepReadonly<NodeData>, HTMLElement] | null
  >(null);
  const [highlightedDiv, setHighlightedDiv] = useState<VisualPosition | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const PROXIMITY_THRESHOLD = 20; // Define the proximity threshold

  const handleMoveDrop = (
    draggingItem: [DeepReadonly<NodeData>, HTMLElement],
    target: [DeepReadonly<NodeData>, HTMLElement],
    position: VisualPosition
  ) => {
    stores.designs.actions.moveNode(
      draggingItem[0],
      target[0],
      InsertionAnalyzer.analyzeDocumentPosition(target[1], position)
    );
  };

  const handleDraggingHover = (
    node: [DeepReadonly<NodeData>, HTMLElement],
    isHoverSelf?: boolean
  ) => {
    setDraggingHoveredOtherNode(isHoverSelf ? null : node);
  };

  const latestDraggingHoveredOtherNode = useLatest(draggingHoveredOtherNode);
  const latestHighlightedDiv = useLatest(highlightedDiv);
  const latestDraggingNode = useLatest(draggingNode);

  const handleDraggingEnd = () => {
    if (
      latestDraggingNode.current &&
      latestDraggingHoveredOtherNode.current &&
      latestHighlightedDiv.current
    ) {
      handleMoveDrop(
        latestDraggingNode.current,
        latestDraggingHoveredOtherNode.current,
        latestHighlightedDiv.current
      );
    }

    setDraggingHoveredOtherNode(null);
    setDraggingNode(null);
  };

  const handleDraggingStart = (node: [DeepReadonly<NodeData>, HTMLElement]) => {
    setDraggingNode(node);
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
    if (!draggingHoveredOtherNode || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const positions = [
      {
        top: draggingHoveredOtherNode[1].offsetTop - 10,
        left:
          draggingHoveredOtherNode[1].offsetLeft +
          draggingHoveredOtherNode[1].offsetWidth / 2 -
          5,
        name: "top",
      },
      {
        top:
          draggingHoveredOtherNode[1].offsetTop +
          draggingHoveredOtherNode[1].offsetHeight,
        left:
          draggingHoveredOtherNode[1].offsetLeft +
          draggingHoveredOtherNode[1].offsetWidth / 2 -
          5,
        name: "bottom",
      },
      {
        top:
          draggingHoveredOtherNode[1].offsetTop +
          draggingHoveredOtherNode[1].offsetHeight / 2 -
          5,
        left: draggingHoveredOtherNode[1].offsetLeft - 10,
        name: "left",
      },
      {
        top:
          draggingHoveredOtherNode[1].offsetTop +
          draggingHoveredOtherNode[1].offsetHeight / 2 -
          5,
        left:
          draggingHoveredOtherNode[1].offsetLeft +
          draggingHoveredOtherNode[1].offsetWidth,
        name: "right",
      },
    ];

    let newHighlightedDiv = null;

    positions.forEach((pos) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - (pos.left + 5), 2) + // 5 is half the width of the floating div
          Math.pow(mouseY - (pos.top + 5), 2) // 5 is half the height of the floating div
      );

      if (distance < PROXIMITY_THRESHOLD) {
        newHighlightedDiv = pos.name;
      }
    });

    setHighlightedDiv(newHighlightedDiv);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draggingHoveredOtherNode]);

  const renderFloatingDivs = () => {
    if (draggingHoveredOtherNode) {
      const insertionPositions = InsertionAnalyzer.analyzeVisualPositions(
        draggingHoveredOtherNode[1]
      );
      return (
        <>
          {insertionPositions.top && (
            <div
              style={floatingDivsStyle(
                {
                  top: draggingHoveredOtherNode[1].offsetTop - 10,
                  left:
                    draggingHoveredOtherNode[1].offsetLeft +
                    draggingHoveredOtherNode[1].offsetWidth / 2 -
                    5,
                },
                highlightedDiv === "top"
              )}
              data-name="top"
            ></div>
          )}
          {insertionPositions.bottom && (
            <div
              style={floatingDivsStyle(
                {
                  top:
                    draggingHoveredOtherNode[1].offsetTop +
                    draggingHoveredOtherNode[1].offsetHeight,
                  left:
                    draggingHoveredOtherNode[1].offsetLeft +
                    draggingHoveredOtherNode[1].offsetWidth / 2 -
                    5,
                },
                highlightedDiv === "bottom"
              )}
              data-name="bottom"
            ></div>
          )}
          {insertionPositions.left && (
            <div
              style={floatingDivsStyle(
                {
                  top:
                    draggingHoveredOtherNode[1].offsetTop +
                    draggingHoveredOtherNode[1].offsetHeight / 2 -
                    5,
                  left: draggingHoveredOtherNode[1].offsetLeft - 10,
                },
                highlightedDiv === "left"
              )}
              data-name="left"
            ></div>
          )}
          {insertionPositions.right && (
            <div
              style={floatingDivsStyle(
                {
                  top:
                    draggingHoveredOtherNode[1].offsetTop +
                    draggingHoveredOtherNode[1].offsetHeight / 2 -
                    5,
                  left:
                    draggingHoveredOtherNode[1].offsetLeft +
                    draggingHoveredOtherNode[1].offsetWidth,
                },
                highlightedDiv === "right"
              )}
              data-name="right"
            ></div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      {designTreeData.nodeData.map((node) => (
        <RenderNode
          key={node.id}
          node={node}
          onDraggingHover={handleDraggingHover}
          onDraggingEnd={handleDraggingEnd}
          onDraggingStart={handleDraggingStart}
        />
      ))}
      {renderFloatingDivs()}
    </div>
  );
};
