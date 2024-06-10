import configs from "@/configs";
import stores from "@/stores";
import { css } from "@emotion/css";
import { Space, Tabs, TabsProps } from "antd";

export const Navs = () => {
  const onChange = (key: string) => {
    console.log(key);
    stores.navs.changePaths(0, key);
  };

  const items: TabsProps["items"] = configs.base.navs;

  return (
    <Space size={20}>
      {/* <span className="text-black">回退</span> */}
      <Tabs
        className={css`
          .ant-tabs-nav {
            margin-bottom: 0;
          }
        `}
        defaultActiveKey="apps"
        items={items}
        onChange={onChange}
      />
    </Space>
  );
};
