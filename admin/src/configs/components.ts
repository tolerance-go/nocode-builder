import { ComponentType } from "@/types";
import { Button } from "@/widgets/Button";
import { Custom } from "@/widgets/Custom";
import { CustomWithSlots } from "@/widgets/CustomWithSlots";
import { Table } from "@/widgets/Table";

export const components: {
  [key in string]?: ComponentType;
} = {
  div: "div",
  span: "span",
  text: "text",
  Custom,
  CustomWithSlots,
  Button,
  Table,
};
