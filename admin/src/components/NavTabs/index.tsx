import { css, cx } from "@emotion/css";
import { Tabs, TabsProps } from "antd";

export const NavTabs = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
      className={cx(
        css`
          .ant-tabs-nav {
            margin-bottom: 0;
            height: 34px;
          }
          .ant-tabs-nav .ant-tabs-tab {
            border-top: 0;
            border-left: 0;
          }
        `,
        props.className
      )}
      type="card"
      size={"small"}
    />
  );
};
