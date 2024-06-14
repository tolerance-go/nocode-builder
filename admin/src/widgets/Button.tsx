import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { DesignableComponentProps } from "@/types";
import { isEmpty } from "@/utils/isEmpty";
import { Button as AntdButton, ButtonProps } from "antd";
import React from "react";

export type ButtonSettings = {
  text: string;
  type: ButtonProps["type"];
};

export const Button: React.FC<
  DesignableComponentProps<React.ReactNode, ButtonSettings>
> = ({ node, children, ...rest }) => {
  const { text, type } = node.settings;

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
