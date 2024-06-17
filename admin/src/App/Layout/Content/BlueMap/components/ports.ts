import { BasePortProps } from "../types";
import { BasePort } from "./ports/BasePort";

export const ports: {
  [key: string]: React.FC<BasePortProps>;
} = {
  BasePort,
};
