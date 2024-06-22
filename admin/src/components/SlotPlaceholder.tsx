import { slotBackground } from "@/configs/styles";
import { coreEventBus } from "@/globals/coreEventBus";
import { NodeData } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { useState, useEffect } from "react";

export type SlotPlaceholderProps = {
  slotName?: string;
  parentNode: DeepReadonly<NodeData>;
};

export const SlotPlaceholder: React.FC<SlotPlaceholderProps> = ({
  slotName = "",
  parentNode,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    return coreEventBus.on("draggingHoveringNode", ({ node }) => {
      setIsHovering(node?.id === parentNode.id);
    });
  }, [parentNode.id]);

  useEffect(() => {
    return coreEventBus.on("draggingNestHoveringNodeSlot", ({ nodeMeta }) => {
      setIsHighlighted(
        nodeMeta
          ? nodeMeta.nodeId === parentNode.id && slotName === nodeMeta.slotName
          : false
      );
    });
  }, [parentNode.id, slotName]);

  return isHovering ? (
    <div
      data-type={"inner-slot"}
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
