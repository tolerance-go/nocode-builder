import stores from "@/stores";
import { Button, Flex, Input, Space } from "antd";
import { useSnapshot } from "valtio";
import { StageWithRouter } from "./StageWithRouter";
import { globalEventBus } from "@/globals/eventBus";

export const Designer = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);
  const stageMemoryRouter = useSnapshot(stores.routes.states.stageMemoryRouter);

  return (
    <div>
      <Flex justify="space-between" className="px-2 py-1 border-b">
        <Space>
          <Space>
            <Button
              disabled={stageMemoryRouter.index === 0}
              size="small"
              type="text"
              onClick={() => {
                globalEventBus.emit("stageNavigate", {
                  to: -1,
                });
              }}
            >
              回退
            </Button>
            <Button
              disabled={
                stageMemoryRouter.index >= stageMemoryRouter.entries.length - 1
              }
              size="small"
              type="text"
              onClick={() => {
                globalEventBus.emit("stageNavigate", {
                  to: 1,
                });
              }}
            >
              前进
            </Button>
          </Space>
          <Input size="small" value={stageMemoryRouter.location}></Input>
        </Space>
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
      <StageWithRouter />
    </div>
  );
};
