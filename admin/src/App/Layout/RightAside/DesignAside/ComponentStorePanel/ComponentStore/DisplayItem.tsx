import { SettingConfig } from "@/components/SettingsForm";
import { coreEventBus } from "@/globals/coreEventBus";
import useLatest from "@/hooks/useLatest";
import store from "@/stores";
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

  const dragging = useSnapshot(store.designs.states.dragging);
  const isDragging = dragging.draggingId === nodeData.id;

  const handleMouseMove = () => {};

  const handleMouseMoveRef = useLatest(handleMouseMove);

  const handleMouseUp = () => {
    store.designs.actions.stopDragging();

    coreEventBus.emit("externalDragEnd", { nodeData });

    // 更新下一次拖拽的 id
    setNodeData(createNodeData(component));
  };
  const handleMouseUpRef = useLatest(handleMouseUp);

  useEffect(() => {
    const handleMouseMove = handleMouseMoveRef.current;
    const handleMouseUp = handleMouseUpRef.current;
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
  }, [isDragging, handleMouseMoveRef, handleMouseUpRef]);

  return (
    <div
      className="cursor-move select-none"
      onMouseDown={() => {
        coreEventBus.emit("externalDragStart", {
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
