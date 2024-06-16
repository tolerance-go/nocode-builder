import stores from "@/stores";
import { renderNodes } from "@/utils/renderNodes";
import { useSnapshot } from "valtio";
import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";

export const Preview = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);
  return (
    <MemoryRouter>{renderNodes(designTreeData.value.nodeData)}</MemoryRouter>
  );
};
