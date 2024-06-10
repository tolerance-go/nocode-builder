import type { TabsProps } from "antd";
import { Flex, Row, Tabs } from "antd";
import { css } from "@emotion/css";
import { useTranslation } from "react-i18next";
import { LngSwitcher } from "./LngSwitcher";

export const Header = () => {
  const { t } = useTranslation();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "apps",
      label: t("apps"),
    },
    {
      key: "users",
      label: "users",
    },
    {
      key: "plugins",
      label: "plugins",
    },
    {
      key: "settings",
      label: "settings",
    },
  ];

  return (
    <Flex justify="space-between" align="center">
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
      <LngSwitcher />
    </Flex>
  );
};
