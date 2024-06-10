import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { css } from "@emotion/css";
import { useTranslation } from "react-i18next";

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
  );
};
