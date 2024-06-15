import stores from "@/stores";
import { Button, Space } from "antd";
import { useSnapshot } from "valtio";
import { Location } from "./Location";
import { StageWithRouter } from "./StageWithRouter";

export const Designer = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <div>
      <div className="flex justify-between items-center h-[34px] px-2 py-1 border-b">
        <Space>
          <Location />
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
      </div>
      <StageWithRouter />
    </div>
  );
};
