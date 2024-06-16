import { SettingConfig } from "@/components/SettingsForm";
import { globalEventBus } from "@/globals/eventBus";
import stores from "@/stores";
import { ComponentWidget, NodeData, StaticProps } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

const nodeDataTpl = {
  styles: {
    // background: "lightblue",
  },
};

const collectDefaultSettings = (
  settingsForm: DeepReadonly<SettingConfig[]>
): StaticProps => {
  const settings: StaticProps = {};

  settingsForm.forEach((config) => {
    settings[config.name] = config.defaultValue ?? null;
  });

  return settings;
};

const createNodeData = (component: DeepReadonly<ComponentWidget>): NodeData => {
  return {
    ...nodeDataTpl,
    fromWidgetId: component.id,
    elementType: component.elementType,
    id: Math.random() + "",
    styles: {
      ...nodeDataTpl.styles,
      ...component.defaultStyles,
    },
    /** 收集所有 component.settingsForm 内的 defaultValue 设置一次 settings */
    settings: collectDefaultSettings(component.settingsForm ?? []),
  } as NodeData;
};

export const DisplayItem: React.FC<{
  component: DeepReadonly<ComponentWidget>;
  index: number;
}> = ({ component }) => {
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
    <div
      className="cursor-move select-none"
      onMouseDown={() => {
        globalEventBus.emit("externalDragStart", {
          nodeData,
        });
      }}
      style={{
        padding: 24,
      }}
    >
      {component.name}
    </div>
  );
};
