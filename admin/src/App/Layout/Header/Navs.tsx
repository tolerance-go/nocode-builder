import configs from "@/configs";
import stores from "@/stores";
import { findTabItems } from "@/utils/findTabItems";
import { css } from "@emotion/css";
import { Button, Divider, Space, Tabs, TabsProps, Typography } from "antd";
import { useSnapshot } from "valtio";

export const Navs = () => {
  const onChange = (key: string) => {
    stores.navs.actions.changeNav(key);
  };

  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);

  const getItems = (): TabsProps["items"] => {
    return findTabItems(configs.navs.topNavs, currentSystemPaths.paths);
  };

  const items: TabsProps["items"] = getItems();

  return (
    <Space split={<Divider type="vertical" />}>
      {currentSystemPaths.paths.length > 1 && (
        <Button type="text" onClick={() => stores.navs.actions.backNav()}>
          回退
        </Button>
      )}
      {currentSystemPaths.startsWithAppAndId && (
        <Typography.Text type="secondary">
          {currentSystemPaths.paths[1].value}
        </Typography.Text>
      )}
      <Tabs
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
          }
        `}
        activeKey={currentSystemPaths.activeTopNavKey}
        items={items}
        onChange={onChange}
      />
    </Space>
  );
};
