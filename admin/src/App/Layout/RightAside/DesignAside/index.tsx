import { DesignAsideType } from "@/types";
import { useSearchParams } from "react-router-dom";
import ComponentSettingsForm from "./ComponentSettingsForm";
import { ComponentStorePanel } from "./ComponentStorePanel";
import { css } from "@emotion/css";
import { Tabs, Space, Button } from "antd";

export const DesignAside = () => {
  const [searchParams] = useSearchParams({
    designAsideType: "settings" as DesignAsideType,
  });

  if (searchParams.get("designAsideType") === "store") {
    return <ComponentStorePanel />;
  }

  if (searchParams.get("designAsideType") === "settings") {
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
  }
};
