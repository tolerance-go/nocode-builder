import { Layout } from "./Layout";
import "./index.css";
import "@antv/s2-react/dist/style.min.css";
import { EventBusContext, EventMaps } from "@/hooks/useEventBus";
import { EventBus } from "@/utils/eventBus";
import { useState } from "react";

function App() {
  const [eventBus] = useState(() => new EventBus<EventMaps>());
  return (
    <>
      <EventBusContext.Provider value={eventBus}>
        <Layout />
      </EventBusContext.Provider>
    </>
  );
}

export default App;
