import { EventBus } from "@/utils/eventBus";
import { createContext, useContext } from "react";

export type EventMaps = {
  editTextChange: string;
};

export const EventBusContext = createContext<EventBus<EventMaps> | null>(null);

export const useEventBus = () => {
  const eventBus = useContext(EventBusContext);
  if (!eventBus) {
    throw new Error("eventBus not find.");
  }
  return eventBus;
};
