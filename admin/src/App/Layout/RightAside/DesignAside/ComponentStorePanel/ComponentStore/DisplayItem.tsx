import { globalEventBus } from "@/globals/eventBus";
import stores from "@/stores";
import { ComponentWidget, NodeData } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
const nodeDataTpl = {
  staticProps: {
    style: {
      background: "lightblue",
    },
  },
};

const createNodeData = (component: DeepReadonly<ComponentWidget>): NodeData => {
  return {
    ...nodeDataTpl,
    elementType: component.elementType,
    id: Math.random() + "",
    staticProps: {
      ...nodeDataTpl.staticProps,
      ...component.defaultStaticProps,
      style: {
        ...nodeDataTpl.staticProps.style,
        ...(typeof component.defaultStaticProps?.style === "object"
          ? component.defaultStaticProps?.style
          : undefined),
      },
    },
  } as NodeData;
};

export const DisplayItem: React.FC<{
  component: DeepReadonly<ComponentWidget>;
  index: number;
}> = ({ component, index }) => {
  const [nodeData, setNodeData] = useState(() => createNodeData(component));

  const dragging = useSnapshot(stores.designs.states.dragging);
  const isDragging = dragging.draggingId === nodeData.id;

  const handleMouseMove = () => {};

  const handleMouseUp = () => {
    stores.designs.actions.stopDragging();

    globalEventBus.emit("externalDragEnd", { nodeData });

    // 更新下一次拖拽的 id
    setNodeData(createNodeData(component));
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

  return (
    <Card.Grid
      key={index}
      style={gridStyle}
      className="cursor-move select-none"
      onMouseDown={() => {
        globalEventBus.emit("externalDragStart", {
          nodeData,
        });
      }}
    >
      {component.name}
    </Card.Grid>
  );
};
