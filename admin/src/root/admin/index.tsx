import { Avatar, Button, Dropdown, Flex, Layout, theme } from "antd";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AsideHeader } from "./AsideHeader";
import { ProjectTree } from "./ProjectTree";
import { TreeMenuRef } from "./ProjectTree/TreeMenu";
import store from "store2";

export const Admin = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const treeMenuRef = useRef<TreeMenuRef>(null);
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
                      navigate("/entry/login");
                    },
                  },
                ],
              }}
              placement="topRight"
            >
              <Button type="text" shape="circle" icon={<Avatar />}></Button>
            </Dropdown>
          </Flex>
          <Flex
            vertical
            style={{
              height: "100%",
              flexGrow: 1,
            }}
          >
            <AsideHeader treeMenuRef={treeMenuRef} />
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <ProjectTree ref={treeMenuRef} />
            </div>
          </Flex>
        </Flex>
      </Layout.Sider>
    </Layout>
  );
};
