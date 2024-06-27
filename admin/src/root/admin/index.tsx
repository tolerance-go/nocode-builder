import { Avatar, Button, Dropdown, Flex, Layout, theme } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import store from "store2";
import { Header } from "./Aside/Header";
import { ProjectTree } from "./ProjectTree";

export const Admin = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  if (!store.get("token")) {
    return <Navigate to={"/entry/login"} />;
  }

  return (
    <Layout
      style={{
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <Layout.Sider
        width={400}
        style={{
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Flex
          style={{
            height: "100%",
          }}
        >
          <Flex
            style={{
              padding: `${token.sizeSM}px ${token.sizeXS}px`,
              borderRight: `1px solid ${token.colorBorderSecondary}`,
            }}
            justify="center"
            align="end"
          >
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: "登出",
                    onClick: () => {
                      navigate("/login");
                    },
                  },
                ],
              }}
              placement="topRight"
            >
              <Button type="text" shape="circle" icon={<Avatar />}></Button>
            </Dropdown>
          </Flex>
          
        </Flex>
      </Layout.Sider>
    </Layout>
  );
};
