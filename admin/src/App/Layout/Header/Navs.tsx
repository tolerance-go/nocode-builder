import configs from "@/configs";
import stores from "@/stores";
import { css } from "@emotion/css";
import { Button, Divider, Space, Tabs, TabsProps } from "antd";
import { useSnapshot } from "valtio";

export const Navs = () => {
  const onChange = (key: string) => {
    stores.navs.actions.changeNav(key);
  };

  const currentSystemPaths = useSnapshot(stores.navs.states.currentSystemPaths);

  const getItems = (): TabsProps["items"] => {
    /**
     * 如果第一个是 apps 并且第二个参数不为空，则显示 app 下的子导航
     */
    if (currentSystemPaths.paths[0].value === "apps") {
      if (currentSystemPaths.paths[1]) {
        return configs.base.navs.find((item) => item.key === "apps")?.items;
      }
    }
    return configs.base.navs;
  };

  const items: TabsProps["items"] = getItems();

  return (
    <Space split={<Divider type="vertical" />}>
      {currentSystemPaths.paths.length > 1 && (
        <Button type="text" onClick={() => stores.navs.actions.backNav()}>
          回退
        </Button>
      )}
      <Tabs
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
          }
        `}
        activeKey={currentSystemPaths.activeNavKey}
        items={items}
        onChange={onChange}
      />
    </Space>
  );
};
