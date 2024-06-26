import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { MemoryRoute } from "@/components/memoryRouter/MemoryRoute";
import { ComponentWidget, DesignableComponentProps } from "@/types/common";
import { isEmpty } from "@/utils/isEmpty";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const RouteWidget: ComponentWidget = {
  id: "component-general-Route",
  type: "component",
  groupType: "general",
  elementType: "Route",
  name: "Route",
  tags: [],
  defaultStyles: {},
  settingsForm: [
    { type: "text", label: "路径", name: "path", defaultValue: "/" },
  ],
};

export type RouteSettings = {
  path: string;
};

export const Route: React.FC<
  DesignableComponentProps<React.ReactNode, RouteSettings>
> = ({ node, children, ...rest }) => {
  const { path } = node.settings;

  return (
    <div {...rest}>
      <MemoryRoute path={path}>
        {isEmpty(children) ? (
          <SlotPlaceholder parentNode={node}></SlotPlaceholder>
        ) : (
          children
        )}
      </MemoryRoute>
    </div>
  );
};
