import { BlueMapPortConfig } from "../../../types";
import { ArrowPortConfig } from "../../../components/ports/ArrowPort/config";
import { ExecBlueMapPort } from ".";
import colors from "tailwindcss/colors";

export const ExecBlueMapPortConfig: BlueMapPortConfig = {
  type: "exec",
  component: ExecBlueMapPort,
  portConfigId: ArrowPortConfig.id,
  edgeConfig: {
    color: colors.green[600],
  },
};
