import { BasePortLabelProps } from "../../../types";

export const BasePortLabel = ({
  port,
  width = 100,
  height = 50,
}: BasePortLabelProps & {
  width?: number;
  height?: number;
}) => {
  const position = port.position.name;
  return (
    <div
      style={{
        right: position === "right" ? 0 : undefined,
        left: position === "left" ? 0 : undefined,
        width,
        height,
      }}
      className="bg-gray-300 absolute top-0 -translate-y-[50%]"
    >
      {position}
    </div>
  );
};
