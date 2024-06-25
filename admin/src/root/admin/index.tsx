import { projectGroupControllerCreateProjectGroup } from "@/services/api/projectGroupControllerCreateProjectGroup";
import { FolderAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, theme } from "antd";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import store from "store2";
import { TreeMenu, TreeMenuRef } from "./TreeMenu";

export const Admin = () => {
  const [loading, setLoading] = useState(false);
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
              <Button
                type="text"
                shape="circle"
                loading={loading}
                icon={<Avatar />}
              ></Button>
            </Dropdown>
          </Flex>
          <Flex
            vertical
            style={{
              height: "100%",
              flexGrow: 1,
            }}
          >
            <Flex
              justify="end"
              style={{
                padding: `${token.sizeXXS}px ${token.sizeXS}px`,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <Button
                type="text"
                loading={loading}
                icon={<FolderAddOutlined />}
                onClick={async () => {
                  treeMenuRef.current?.addFolder()
                  // try {
                  //   setLoading(true);
                  //   await projectGroupControllerCreateProjectGroup({
                  //     name: "test",
                  //   });
                  // } finally {
                  //   setLoading(false);
                  // }
                }}
              ></Button>
            </Flex>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <TreeMenu ref={treeMenuRef} />
            </div>
          </Flex>
        </Flex>
      </Layout.Sider>
    </Layout>
  );
};
