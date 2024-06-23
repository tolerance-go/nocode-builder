import { AddBtn } from "@/components/AddBtn";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { css } from "@emotion/css";
import { Space, Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import ComponentSettingsForm from "./ComponentSettingsForm";
import EventTree from "./EventTree";

type NodeSettingPanel = "setting" | "style" | "event";

export const ComponentSettingsPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    nodeSettingPanel: "tree" as NodeSettingPanel,
  });

  const nodeSettingPanel = searchParams.get(
    "nodeSettingPanel"
  ) as NodeSettingPanel;

  const renderContent = () => {
    if (nodeSettingPanel === "setting") {
      return <ComponentSettingsForm />;
    }
    if (nodeSettingPanel === "event") {
      return <EventTree />;
    }
  };

  return (
    <div>
      <Tabs
        tabBarExtraContent={
          <Space className="px-2">
            <AddBtn></AddBtn>
          </Space>
        }
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
            height: 34px;
          }
          .ant-tabs-nav .ant-tabs-tab {
            border-top: 0;
            border-left: 0;
          }
        `}
        type="card"
        size={"small"}
        activeKey={nodeSettingPanel}
        items={[
          {
            label: "配置",
            key: "setting",
          },
          {
            label: "样式",
            key: "style",
          },
          {
            label: "事件",
            key: "event",
          },
        ]}
        onChange={(key) => {
          setSearchParams(
            updateSearchParams(searchParams, {
              nodeSettingPanel: key,
            })
          );
        }}
      />
      {renderContent()}
    </div>
  );
};
