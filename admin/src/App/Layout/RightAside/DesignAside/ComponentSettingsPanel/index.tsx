import { css } from "@emotion/css";
import { Tabs, Space, Button } from "antd";
import ComponentSettingsForm from "./ComponentSettingsForm";

export const ComponentSettingsPanel = () => {
  return (
    <div>
      <Tabs
        tabBarExtraContent={
          <Space className="px-2">
            <Button type="text" size="small">
              添加
            </Button>
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
            label: "蓝图",
            key: "bluemap",
          },
        ]}
      />
      <ComponentSettingsForm />
    </div>
  );
};
