import colors from "tailwindcss/colors";
import { ExecPort } from ".";
import { BlueMapPortConfig } from "@/types/common";

export const ExecPortConfig: BlueMapPortConfig = {
  id: "exec",
  type: "exec",
  component: ExecPort,
  edgeConfig: {
    strokeWidth: 2.5,
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
            validate: ({ scene, source, target }) => {
              if (scene === "connect") {
                return source.node.id !== target.node.id;
              }
              return true;
            },
          },
          {
            selfIoType: "input",
            portType: "exec",
            ioType: "output",
            validate: ({ scene, source, target }) => {
              if (scene === "connect") {
                return source.node.id !== target.node.id;
              }
              return true;
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
            validate: ({ scene, source, target }) => {
              if (scene === "connect") {
                return source.node.id === target.node.id;
              }
              return false;
            },
          },
          {
            selfIoType: "input",
            portType: "exec",
            ioType: "output",
            validate: ({ scene, source, target }) => {
              if (scene === "connect") {
                return source.node.id === target.node.id;
              }
              return false;
            },
          },
        ],
      },
    },
  },
};
