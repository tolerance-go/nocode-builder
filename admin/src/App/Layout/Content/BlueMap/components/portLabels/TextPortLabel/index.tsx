import { BasePortLabelProps } from "../../../types";

export const TextPortLabel = (props: BasePortLabelProps) => {
  const position = props.port.label.position.name;
  return (
    <div
      style={{
        left: position === "left" ? 0 : undefined,
        right: position === "right" ? 0 : undefined,
      }}
      className="w-[10px] bg-gray-300 h-[10px] absolute top-0"
    >
      {position}
    </div>
  );
};
