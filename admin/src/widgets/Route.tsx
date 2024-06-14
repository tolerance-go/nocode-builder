import { SlotPlaceholder } from "@/components/SlotPlaceholder";
import { MemoryRoute } from "@/components/memoryRouter/MemoryRoute";
import { ComponentWidget, DesignableComponentProps } from "@/types";
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
  defaultStaticProps: {
    style: {
      padding: 10,
    },
  },
  settingsForm: [
    { type: "text", label: "路径", name: "path", defaultValue: "/" },
  ],
};

export type RouteSettings = {
  path: string;
};

export const Route: React.FC<
  DesignableComponentProps<Record<string, React.ReactNode>, RouteSettings>
> = ({ node, children, ...rest }) => {
  const { path } = node.settings;

  return (
    <div {...rest}>
      <MemoryRoute
        path={path}
        element={
          isEmpty(children?.element) ? (
            <SlotPlaceholder
              slotName="element"
              parentNode={node}
            ></SlotPlaceholder>
          ) : (
            children?.element
          )
        }
      >
        {isEmpty(children?.routes) ? (
          <SlotPlaceholder
            slotName="routes"
            parentNode={node}
          ></SlotPlaceholder>
        ) : (
          children?.routes
        )}
      </MemoryRoute>
    </div>
  );
};
