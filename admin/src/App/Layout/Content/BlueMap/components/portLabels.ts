import { BasePortLabelProps } from "../types";
import { TextPortLabel } from "./portLabels/TextPortLabel";

export const portLabels: {
  [key: string]: React.FC<BasePortLabelProps>;
} = {
  TextPortLabel,
};
