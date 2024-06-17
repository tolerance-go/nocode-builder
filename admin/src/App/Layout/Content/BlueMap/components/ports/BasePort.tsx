import { Select } from "antd";
import { BasePortProps } from "../../types";

export const BasePort = ({ port }: BasePortProps) => {
  const position = port.position.name;
  return (
    <div className="bg-gray-300 cursor-pointer h-[100%]">
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
