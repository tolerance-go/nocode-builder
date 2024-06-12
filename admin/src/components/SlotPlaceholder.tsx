import { slotBackground } from "@/configs/other";
import { globalEventBus } from "@/globals/eventBus";
import { NodeData } from "@/stores/designs";
import { DeepReadonly } from "@/utils/types";
import { useState, useEffect } from "react";
export type SlotPlaceholderProps = {
  slotName: string;
  parentNode: DeepReadonly<NodeData>;
};
export const SlotPlaceholder: React.FC<SlotPlaceholderProps> = ({
  slotName,
  parentNode,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    return globalEventBus.on("draggingHoveringNode", ({ node }) => {
      setIsHovering(node?.id === parentNode.id);
    });
  }, []);

  useEffect(() => {
    return globalEventBus.on("draggingNestHoveringNodeSlot", ({ nodeMeta }) => {
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
