import Route from "@/components/Route";
import { appSubNavs, navTabs } from "@/configs/navs";
import useNavigate from "@/hooks/useNavigate";
import useParams from "@/hooks/useParams";
import { css } from "@emotion/css";
import { Button, Divider, Space, Tabs, Typography } from "antd";

export const Navs = () => {
  const { feature, id, sub } = useParams("/:feature/:id/:sub");
  const navigate = useNavigate();

  return (
    <Space split={<Divider type="vertical" />}>
      {id && (
        <Button type="text" onClick={() => navigate("/apps")}>
          回退
        </Button>
      )}
      {id && <Typography.Text type="secondary">{id}</Typography.Text>}
      <div>
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
      </div>
    </Space>
  );
};
