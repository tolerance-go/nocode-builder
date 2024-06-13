import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types";
import { isEmpty } from "@/utils/isEmpty";
import { Button as AntdButton, ButtonProps } from "antd";

export const Button = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  children,
  ...rest
}: DesignableComponentProps<{
  children: React.ReactNode;
  settings: {
    text: string;
    type: ButtonProps["type"];
  };
}>) => {
  const { text, type } = node.settings ?? {};

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
          (isEmpty(children) ? (
            <SlotPlaceholder parentNode={node}></SlotPlaceholder>
          ) : (
            children
          ))}
      </AntdButton>
    </div>
  );
};
