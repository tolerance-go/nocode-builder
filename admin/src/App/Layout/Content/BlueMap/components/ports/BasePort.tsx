import { Select } from "antd";
import { BasePortProps } from "../../types";

export const BasePort = ({
  port,
  width = 100,
  height = 50,
}: BasePortProps & {
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
      className="bg-gray-300 absolute top-0 -translate-y-[50%] cursor-pointer"
    >
      <Select
        onMouseDown={(e) => e.stopPropagation()}
        options={[
          {
            label: "sldfj",
            value: "asdfasdf",
          },
          {
            label: "sasdfasdfldfj",
            value: "asdasdffasdf",
          },
        ]}
      ></Select>
      {position}
    </div>
  );
};
