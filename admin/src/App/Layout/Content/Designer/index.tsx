import stores from "@/stores";
import { Button, Flex, Space } from "antd";
import { useSnapshot } from "valtio";
import { Stage } from "./Stage";
import { MemoryRouter } from "@/components/memoryRouter/MemoryRouter";

export const Designer = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <div>
      <Flex justify="end" className="px-2 py-1 border-b">
        <Space>
          <Button
            size="small"
            type="text"
            onClick={() => {
              designTreeData.undo();
            }}
          >
            回撤
          </Button>
          <Button
            size="small"
            type="text"
            onClick={() => {
              designTreeData.redo();
            }}
          >
            重做
          </Button>
        </Space>
      </Flex>
      <MemoryRouter>
        <Stage></Stage>
      </MemoryRouter>
    </div>
  );
};
