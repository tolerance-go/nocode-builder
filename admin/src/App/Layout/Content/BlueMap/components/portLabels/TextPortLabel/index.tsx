import { BasePortLabelProps } from "../../../types";

export const TextPortLabel = (props: BasePortLabelProps) => {
  return (
    <div className="w-[10px] bg-gray-300 h-[10px]">
      {props.port.label.position.name}
    </div>
  );
};
