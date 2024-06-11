import useLatest from "@/hooks/useLatest";
import stores from "@/stores";
import { NodeData, NodePlainChild } from "@/stores/designs";
import { RectVisualPosition, VisualPosition } from "@/types";
import { ensure } from "@/utils/ensure";
import { DeepReadonly } from "@/utils/ensure/types";
import { EventBus } from "@/utils/eventBus";
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

const CustomWithSlots = ({
  children,
  node,
  ...rest
}: DesignableComponentProps) => {
  ensure(isPlainObject(children), "children 类型是对象");

  return (
    <div {...rest}>
      <Button>自定义按钮</Button>
      <div>
        slot0:
        {children.slot0 || (
          <SlotPlaceholder slotName="slot0" parentNode={node}></SlotPlaceholder>
        )}
      </div>
      <div>
        slot1:{" "}
        {children.slot1 || (
          <SlotPlaceholder slotName="slot1" parentNode={node}></SlotPlaceholder>
        )}
      </div>
      <div>
        slot2:{" "}
        {children.slot2 || (
          <SlotPlaceholder slotName="slot2" parentNode={node}></SlotPlaceholder>
        )}
      </div>
      <div>
        slot3:{" "}
        {children.slot3 || (
          <SlotPlaceholder slotName="slot3" parentNode={node}></SlotPlaceholder>
        )}
      </div>
    </div>
  );
};

type SlotPlaceholderProps = {
  slotName: string;
  parentNode: DeepReadonly<NodeData>;
};

const eventBus = new EventBus<{
  draggingHoveringNode: {
    node: DeepReadonly<NodeData> | null;
  };
  /**
   * 悬停鼠标接近悬停 node 中的插槽
   */
  draggingNestHoveringNodeSlot: {
    nodeMeta: {
      slotName: string;
      nodeId: string;
    } | null;
  };
}>();

const slotBackground = "rgba(0,0,0,0.5)";

const SlotPlaceholder: React.FC<SlotPlaceholderProps> = ({
  slotName,
  parentNode,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    return eventBus.on("draggingHoveringNode", ({ node }) => {
      setIsHovering(node?.id === parentNode.id);
    });
  }, []);

  useEffect(() => {
    return eventBus.on("draggingNestHoveringNodeSlot", ({ nodeMeta }) => {
      setIsHighlighted(
        nodeMeta
          ? nodeMeta.nodeId === parentNode.id && slotName === nodeMeta.slotName
          : false
      );
    });
  }, []);

  return isHovering ? (
    <div
      data-slot-placeholder
      data-slot-name={slotName}
      data-slot-parent-id={parentNode.id}
      style={{
        width: "10px",
        height: "10px",
        background: isHighlighted ? "red" : slotBackground,
      }}
    ></div>
  ) : null;
};

type DesignableComponentProps = {
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
  children?: React.ReactNode | Record<string, React.ReactNode>;
  node: DeepReadonly<NodeData>;
  ["data-node-id"]: string;
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
    info: {
      /**
       * 是否是自身，这里是范围是 Node，而不是 DOM
       */
      isHoverSelf?: boolean;
      /**
       * 是否是后代元素，这里的范围是 DOM，并且是动态的
       */
      isHoverDescendant?: boolean;
    }
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
      const draggingNodeEl = document.querySelector(
        `[data-node-id="${dragging.draggingId}"]`
      );

      const isHoverDescendant = draggingNodeEl?.contains(event.currentTarget);
      const isHoverSelf = dragging.draggingId === node.id;

      onDraggingHover([node, event.currentTarget as HTMLElement], {
        isHoverSelf,
        isHoverDescendant,
      });
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
      userSelect: "none",
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
    node,
    ["data-node-id"]: node.id,
  });
};

type HighlightedSlotMeta = {
  slotName: string;
  nodeId: string;
};

export const Designer: React.FC = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);
  const [draggingHoveredOtherNode, setDraggingHoveredOtherNode] = useState<
    [DeepReadonly<NodeData>, HTMLElement] | null
  >(null);
  const [draggingNode, setDraggingNode] = useState<
    [DeepReadonly<NodeData>, HTMLElement] | null
  >(null);
  const [highlightedPos, setHighlightedPos] =
    useState<RectVisualPosition | null>(null);
  const [highlightedSlot, setHighlightedSlot] =
    useState<HighlightedSlotMeta | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const PROXIMITY_THRESHOLD = 20; // Define the proximity threshold

  const handleMoveDrop = (
    draggingItem: [DeepReadonly<NodeData>, HTMLElement],
    target: [DeepReadonly<NodeData>, HTMLElement],
    position: VisualPosition,
    slotName?: string
  ) => {
    if (position === "inner") {
      stores.designs.actions.moveNode(
        draggingItem[0],
        target[0],
        "inner",
        slotName
      );
    } else {
      stores.designs.actions.moveNode(
        draggingItem[0],
        target[0],
        InsertionAnalyzer.analyzeDocumentPosition(target[1], position)
      );
    }
  };

  const handleDraggingHover = (
    node: [DeepReadonly<NodeData>, HTMLElement],
    info: { isHoverSelf?: boolean; isHoverDescendant?: boolean }
  ) => {
    console.log("info", info);
    setDraggingHoveredOtherNode(
      info.isHoverSelf || info.isHoverDescendant ? null : node
    );
  };

  const latestDraggingHoveredOtherNode = useLatest(draggingHoveredOtherNode);
  const latestHighlightedPos = useLatest(highlightedPos);
  const latestHighlightedSlot = useLatest(highlightedSlot);
  const latestDraggingNode = useLatest(draggingNode);

  const handleDraggingEnd = () => {
    if (
      latestDraggingNode.current &&
      latestDraggingHoveredOtherNode.current &&
      (latestHighlightedPos.current || latestHighlightedSlot.current)
    ) {
      if (latestHighlightedPos.current) {
        handleMoveDrop(
          latestDraggingNode.current,
          latestDraggingHoveredOtherNode.current,
          latestHighlightedPos.current
        );
      } else {
        handleMoveDrop(
          latestDraggingNode.current,
          latestDraggingHoveredOtherNode.current,
          "inner",
          latestHighlightedSlot.current!.slotName
        );
      }
    }

    setDraggingHoveredOtherNode(null);
    setDraggingNode(null);
    setHighlightedSlot(null);
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
    backgroundColor: isHighlighted ? "red" : slotBackground,
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

    setHighlightedPos(newHighlightedDiv);

    /**
     * 这里保证外部四周的插槽和内部的插槽不会同时高亮
     *
     * 检测到已经接近并高亮了外部插槽后，就不检测内部的
     */
    if (newHighlightedDiv) {
      return;
    }

    // 动态查找插槽占位符元素
    const slotPlaceholders = draggingHoveredOtherNode[1].querySelectorAll(
      "[data-slot-placeholder]"
    ) as NodeListOf<HTMLElement>;

    let newHighlightedSlot: HighlightedSlotMeta | null = null;

    slotPlaceholders.forEach((slot: HTMLElement) => {
      const slotRect = slot.getBoundingClientRect();
      const slotLeft = slotRect.left - containerRect.left;
      const slotTop = slotRect.top - containerRect.top;

      const distance = Math.sqrt(
        Math.pow(mouseX - (slotLeft + slotRect.width / 2), 2) +
          Math.pow(mouseY - (slotTop + slotRect.height / 2), 2)
      );

      if (distance < PROXIMITY_THRESHOLD) {
        ensure(
          typeof slot.dataset.slotName === "string",
          "slot.dataset.slotName 不合法。"
        );
        ensure(
          typeof slot.dataset.slotParentId === "string",
          "slot.dataset.slotParentId 不合法。"
        );

        newHighlightedSlot = {
          slotName: slot.dataset.slotName,
          nodeId: slot.dataset.slotParentId,
        };
      }
    });

    setHighlightedSlot(newHighlightedSlot);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [draggingHoveredOtherNode]);

  useEffect(() => {
    eventBus.emit("draggingHoveringNode", {
      node: draggingHoveredOtherNode ? draggingHoveredOtherNode[0] : null,
    });
  }, [draggingHoveredOtherNode]);

  useEffect(() => {
    eventBus.emit("draggingNestHoveringNodeSlot", {
      nodeMeta: highlightedSlot
        ? {
            nodeId: highlightedSlot.nodeId,
            slotName: highlightedSlot.slotName,
          }
        : null,
    });
  }, [highlightedSlot]);

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
                highlightedPos === "top"
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
                highlightedPos === "bottom"
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
                highlightedPos === "left"
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
                highlightedPos === "right"
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
