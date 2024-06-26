import { BlueMapNodeConfig } from "@/types";
import { EventNodeAttrs, EventNode } from ".";
import { generateNodeConfigMetaFromBlueMap } from "@/core/generateNodeConfigMetaFromBlueMap";

export const EventBlueMapNodeConfig: BlueMapNodeConfig<EventNodeAttrs> = {
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

export const EventNodeConfigMeta = generateNodeConfigMetaFromBlueMap(
  EventBlueMapNodeConfig
);
