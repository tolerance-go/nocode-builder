import stores from "@/stores";
import { Button, Space } from "antd";
import { useSnapshot } from "valtio";
import { Location } from "./Location";
import { StageWithRouter } from "./StageWithRouter";
import { ContentToolBar } from "@/components/ContentToolBar";

export const Designer = () => {
  const designTreeData = useSnapshot(stores.designs.states.designTreeData);

  return (
    <div>
      <ContentToolBar>
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
      </ContentToolBar>
      <StageWithRouter />
    </div>
  );
};
