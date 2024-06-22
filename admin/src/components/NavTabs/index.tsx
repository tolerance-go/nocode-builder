import { css, cx } from "@emotion/css";
import { Tabs, TabsProps, Typography } from "antd";
import { isValidElement } from "react";

export const NavTabs = ({ items = [], ...rest }: TabsProps) => {
  if (items.length === 1) {
    return (
      <div className='flex justify-between py-[6px] border-b h-[34px]'>
        <Typography.Text className="px-[16px]">{items[0].label}</Typography.Text>
        {isValidElement(rest.tabBarExtraContent)
          ? rest.tabBarExtraContent
          : null}
      </div>
    );
  }

  return (
    <Tabs
      items={items}
      {...rest}
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
        rest.className
      )}
      type="card"
      size={"small"}
    />
  );
};
