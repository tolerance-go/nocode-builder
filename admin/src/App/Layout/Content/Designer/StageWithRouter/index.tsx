import { useRef, useEffect } from "react";
import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";
import stores from "@/stores";
import { useSnapshot } from "valtio";
import { Stage } from "./Stage";
import { To } from "react-router-dom";
import { globalEventBus } from "@/globals/eventBus";

export const StageWithRouter = () => {
  const stageMemoryRouter = useSnapshot(stores.routes.states.stageMemoryRouter);
  const navigateRef = useRef<{ navigate: (to: To | number) => void }>(null);

  const handleEntriesChange = (entries: readonly string[]) => {
    stores.routes.actions.updateStageMemoryRouterEntries(entries as string[]);
  };

  const handleIndexChange = (index: number) => {
    stores.routes.actions.updateStageMemoryRouterIndex(index);
  };

  useEffect(() => {
    return globalEventBus.on("stageNavigate", (payload) => {
      if (navigateRef.current) {
        navigateRef.current.navigate(payload.to);
      }
    });
  }, []);

  return (
    <MemoryRouter
      initialEntries={stageMemoryRouter.entries}
      initialIndex={stageMemoryRouter.index}
      onEntriesChange={handleEntriesChange}
      onIndexChange={handleIndexChange}
      navigateRef={navigateRef}
    >
      <Stage />
    </MemoryRouter>
  );
};
