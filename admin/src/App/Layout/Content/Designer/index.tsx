import { Button, Flex, Space } from "antd";
import { Stage } from "./Stage";
import { useSnapshot } from "valtio";
import stores from "@/stores";

export const Designer = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <div>
      <Flex justify="end" className="px-2 py-1">
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
      <Stage></Stage>
    </div>
  );
};
