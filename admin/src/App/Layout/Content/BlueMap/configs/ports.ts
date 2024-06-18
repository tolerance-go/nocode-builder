import { BasePortProps } from "../types";
import { BasePort } from "../components/ports/BasePort";

export const ports: {
  [key: string]: React.FC<BasePortProps>;
} = {
  BasePort,
};
