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
                  treeMenuRef.current?.addFolder();
                }}
              ></Button>
            </Flex>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <TreeMenu
                initialTreeData={[
                  {
                    title: "parent 0",
                    key: "0-0",
                    children: [
                      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
                      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
                    ],
                  },
                  {
                    title: "parent 1",
                    key: "0-1",
                    children: [
                      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
                      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
                    ],
                  },
                ]}
                ref={treeMenuRef}
                onFolderAdd={async (_key, title) => {
                  try {
                    setLoading(true);
                    await projectGroupControllerCreateProjectGroup({
                      name: title,
                    });
                    return true;
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            </div>
          </Flex>
        </Flex>
      </Layout.Sider>
    </Layout>
  );
};
