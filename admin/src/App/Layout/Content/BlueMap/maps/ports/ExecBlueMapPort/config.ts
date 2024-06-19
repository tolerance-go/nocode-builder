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
  constraints: {
    connecting: {
      to: {
        allow: [
          {
            selfIoType: "output",
            portType: "exec",
            ioType: "input",
          },
        ],
        prohibit: [
          {
            selfIoType: "input",
            portType: "exec",
            ioType: "input",
          },
        ],
      },
      from: {
        allow: [
          {
            selfIoType: "input",
            portType: "exec",
            ioType: "output",
          },
        ],
      },
    },
  },
};
