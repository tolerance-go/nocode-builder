import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { ComponentWidget, DesignableComponentProps } from "@/types";
import { isEmpty } from "@/utils/isEmpty";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const RootWidget: ComponentWidget = {
  id: "component-general-Root",
  type: "component",
  groupType: "general",
  elementType: "Root",
  name: "Root",
  tags: [],
  defaultStyles: {},
  settingsForm: [],
};

export type RootSettings = Record<string, never>;

export const Root: React.FC<
  DesignableComponentProps<React.ReactNode, RootSettings>
> = ({ node, children, ...rest }) => {
  return (
    <div {...rest}>
      {isEmpty(children) ? (
        <SlotPlaceholder parentNode={node}></SlotPlaceholder>
      ) : (
        children
      )}
    </div>
  );
};
