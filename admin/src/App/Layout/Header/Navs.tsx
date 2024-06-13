import { appSubNavs, navTabs } from "@/configs/navs";
import { css } from "@emotion/css";
import { Button, Divider, Space, Tabs, Typography } from "antd";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";

export const Navs = () => {
  const match = useMatch("/:feature/:id/:sub");

  const navigate = useNavigate();

  if (!match) {
    return <div>not match</div>;
  }

  const { id, feature, sub } = match.params;

  return (
    <Space split={<Divider type="vertical" />}>
      {id && (
        <Button type="text" onClick={() => navigate("/apps")}>
          回退
        </Button>
      )}
      {id && <Typography.Text type="secondary">{id}</Typography.Text>}
      <Routes>
        <Route
          path="/:feature"
          element={
            <Tabs
              className={css`
                .ant-tabs-nav {
                  margin-bottom: 0;
                }
              `}
              activeKey={feature}
              items={navTabs}
              onChange={(key: string) => {
                navigate(`/${key}`);
              }}
            />
          }
        ></Route>
        <Route
          path="/:feature/:id/:sub"
          element={
            <Tabs
              className={css`
                .ant-tabs-nav {
                  margin-bottom: 0;
                }
              `}
              activeKey={sub}
              items={appSubNavs}
              onChange={(key: string) => {
                navigate(`/${feature}/${id}/${key}`);
              }}
            />
          }
        ></Route>
      </Routes>
    </Space>
  );
};
