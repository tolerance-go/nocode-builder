import { css } from "@emotion/css";
import { Tabs, TabsProps } from "antd";

export const NavTabs = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
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
    />
  );
};
