import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";
import stores from "@/stores";
import { useSnapshot } from "valtio";
import { Stage } from "./Stage";

export const StageWithRouter = () => {
  const stageMemoryRouter = useSnapshot(stores.routes.states.stageMemoryRouter);

  const handleEntriesChange = (entries: readonly string[]) => {
    stores.routes.actions.updateStageMemoryRouterEntries(entries as string[]);
  };

  const handleIndexChange = (index: number) => {
    stores.routes.actions.updateStageMemoryRouterIndex(index);
  };

  return (
    <MemoryRouter
      initialEntries={stageMemoryRouter.entries}
      initialIndex={stageMemoryRouter.index}
      onEntriesChange={handleEntriesChange}
      onIndexChange={handleIndexChange}
    >
      <Stage />
    </MemoryRouter>
  );
};
