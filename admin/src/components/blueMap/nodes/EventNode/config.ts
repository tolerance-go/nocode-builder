import { generateBlueMapConfigMeta } from "@/core/generateBlueMapConfigMeta";
import { BlueMapNodeConfig } from "@/types/blueMap";
import { EventNodeAttrs, EventNode } from ".";

export const EventNodeConfig: BlueMapNodeConfig<EventNodeAttrs> = {
  menu: {
    groupType: ["event"],
    title: "事件",
    key: "event",
  },
  id: "EventNode",
  shapeName: "event-node",
  type: "event",
  component: EventNode,
  connections: {
    input: {
      ports: [],
    },
    output: {
      ports: [
        {
          id: "next",
          type: "exec",
        },
      ],
    },
  },
};

export const EventNodeConfigMeta = generateBlueMapConfigMeta(EventNodeConfig);
