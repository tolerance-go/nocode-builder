import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types";
import { isEmpty } from "@/utils/isEmpty";
import { Button as AntdButton, ButtonProps } from "antd";

type Settings = {
  text: string;
  type: ButtonProps["type"];
};

export const Button: React.FC<DesignableComponentProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  children,
  ...rest
}) => {
  const { text, type } = node.settings as Settings;

  return (
    <div
      {...rest}
      style={{
        display: "inline-flex",
        ...rest.style,
      }}
    >
      <AntdButton type={type}>
        {text ||
          (isEmpty(children as React.ReactNode) ? (
            <SlotPlaceholder parentNode={node}></SlotPlaceholder>
          ) : (
            (children as React.ReactNode)
          ))}
      </AntdButton>
    </div>
  );
};
