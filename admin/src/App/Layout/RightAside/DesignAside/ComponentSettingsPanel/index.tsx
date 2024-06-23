import { css } from "@emotion/css";
import { Tabs, Space, Button } from "antd";
import ComponentSettingsForm from "./ComponentSettingsForm";
import { PlusOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "@/utils/updateSearchParams";

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
  };

  return (
    <div>
      <Tabs
        tabBarExtraContent={
          <Space className="px-2">
            <Button
              type="text"
              size="small"
              className="group"
              icon={
                <PlusOutlined className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              }
            ></Button>
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
