import colors from "tailwindcss/colors";
import { ConditionPort } from ".";
import { BlueMapPortConfig } from "../../../../types";

export const ConditionPortConfig: BlueMapPortConfig = {
  id: "exec",
  type: "condition",
  component: ConditionPort,
  edgeConfig: {
    strokeWidth: 2.5,
    color: colors.sky[400],
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
