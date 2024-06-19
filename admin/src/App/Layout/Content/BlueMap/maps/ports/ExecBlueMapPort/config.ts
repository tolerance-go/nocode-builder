import { BlueMapPortConfig } from "../../../types";
import { ArrowPortConfig } from "../../../components/ports/ArrowPort/config";
import { ExecBlueMapPort } from ".";
import colors from "tailwindcss/colors";

export const ExecBlueMapPortConfig: BlueMapPortConfig = {
  type: "exec",
  component: ExecBlueMapPort,
  portConfigId: ArrowPortConfig.id,
  edgeConfig: {
    color: colors.gray[900],
  },
  constraints: {
    connecting: {
      to: {
        allow: [
          {
            selfIoType: "output",
            portType: "exec",
            ioType: "input",
            validate: ({ source, target }) => {
              return source.node.id !== target.node.id;
            },
          },
        ],
        prohibit: [
          {
            selfIoType: "input",
            portType: "exec",
            ioType: "input",
          },
          {
            selfIoType: "output",
            portType: "exec",
            ioType: "input",
            validate: ({ source, target }) => {
              return source.node.id === target.node.id;
            },
          },
        ],
      },
    },
  },
};
