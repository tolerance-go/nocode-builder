import { BasePortLabelProps } from "../types";
import { BasePortLabel } from "./portLabels/BasePortLabel";

export const portLabels: {
  [key: string]: React.FC<BasePortLabelProps>;
} = {
  BasePortLabel,
};
