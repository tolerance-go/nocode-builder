import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";
import { globalEventBus } from "@/globals/eventBus";
import stores from "@/stores";
import { useEffect, useRef } from "react";
import { To } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Stage } from "./Stage";

export const StageWithRouter = () => {
  const stageMemoryRouter = useSnapshot(stores.routes.states.stageMemoryRouter);
  const navigateRef = useRef<{ navigate: (to: To | number) => void }>(null);

  const handlePathnameChange = (pathname: string) => {
    stores.routes.actions.updateStageMemoryRouterPathname(pathname);
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
      initialLocation={stageMemoryRouter.pathname}
      onPathnameChange={handlePathnameChange}
      navigateRef={navigateRef}
    >
      <Stage />
    </MemoryRouter>
  );
};
