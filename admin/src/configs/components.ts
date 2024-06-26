import { ComponentType } from "@/types/common";
import { Button } from "@/widgets/Button";
import { Custom } from "@/widgets/Custom";
import { CustomWithSlots } from "@/widgets/CustomWithSlots";
import { Flex } from "@/widgets/Flex";
import { Root } from "@/widgets/Root";
import { Route } from "@/widgets/Route";
import { Table } from "@/widgets/Table";

export const components: {
  [key in string]?: ComponentType;
} = {
  div: "div",
  span: "span",
  text: "text",
  Custom: Custom as ComponentType,
  CustomWithSlots: CustomWithSlots as ComponentType,
  Button: Button as ComponentType,
  Table: Table as ComponentType,
  Flex: Flex as ComponentType,
  Route: Route as ComponentType,
  Root: Root as ComponentType,
};
