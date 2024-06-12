import React, { useEffect } from "react";
import { Card } from "antd";
import { ComponentWidget } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { globalEventBus } from "@/globals/eventBus";
import stores from "@/stores";
import { useSnapshot } from "valtio";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const nodeData = {
  id: Math.random() + "",
  elementType: "Button",
  staticProps: {
    style: {
      background: "lightblue",
    },
  },
};

export const ComponentDisplay: React.FC<{
  components: DeepReadonly<ComponentWidget[]>;
}> = ({ components }) => {
  const dragging = useSnapshot(stores.designs.states.dragging);
  const isDragging = dragging.draggingId === nodeData.id;

  const handleMouseMove = () => {};

  const handleMouseUp = () => {
    stores.designs.actions.stopDragging();

    globalEventBus.emit("externalDragEnd", { nodeData });
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
    <Card
      bordered={false}
      style={{
        borderRadius: 0,
      }}
    >
      {components.map((component, index) => (
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
      ))}
    </Card>
  );
};
