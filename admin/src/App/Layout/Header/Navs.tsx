import { appSubNavs, navTabs } from "@/configs/navs";
import { css } from "@emotion/css";
import { Button, Divider, Space, Tabs, Typography } from "antd";
import { useMatch, useNavigate } from "react-router-dom";

export const Navs = () => {
  const featureMatch = useMatch("/:feature/:id?");
  const featureIdSubMatch = useMatch("/:feature/:id/:sub");
  const featureIdMatch = useMatch("/:feature/:id/:sub");

  const navigate = useNavigate();

  return (
    <Space split={<Divider type="vertical" />}>
      {featureIdMatch?.params.id && (
        <Button type="text" onClick={() => navigate("/apps")}>
          回退
        </Button>
      )}
      {featureIdMatch?.params.id && (
        <Typography.Text type="secondary">
          {featureIdMatch.params.id}
        </Typography.Text>
      )}
      {featureMatch && (
        <Tabs
          className={css`
            .ant-tabs-nav {
              margin-bottom: 0;
            }
          `}
          activeKey={featureMatch.params.feature}
          items={navTabs}
          onChange={(key: string) => {
            navigate(`/${key}`);
          }}
        />
      )}
      {featureIdSubMatch && (
        <Tabs
          className={css`
            .ant-tabs-nav {
              margin-bottom: 0;
            }
          `}
          activeKey={featureIdSubMatch.params.sub}
          items={appSubNavs}
          onChange={(key: string) => {
            navigate(
              `/${featureIdSubMatch.params.feature}/${featureIdSubMatch.params.id}/${key}`
            );
          }}
        />
      )}
    </Space>
  );
};
