import { ComponentType } from "@/types";
import { Button } from "@/widgets/Button";
import { Custom } from "@/widgets/Custom";
import { CustomWithSlots } from "@/widgets/CustomWithSlots";

export const components: {
  [key in string]?: ComponentType;
} = {
  div: "div",
  span: "span",
  text: "text",
  Custom,
  CustomWithSlots,
  Button,
};
