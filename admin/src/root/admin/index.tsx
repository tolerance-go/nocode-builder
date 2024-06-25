import { projectGroupControllerCreateProjectGroup } from "@/services/api/projectGroupControllerCreateProjectGroup";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, theme } from "antd";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import store from "store2";
import { TreeMenu, TreeMenuRef } from "./TreeMenu";
import { projectControllerCreateProject } from "@/services/api/projectControllerCreateProject";

export const Admin = () => {
  const [addFolderLoading, setAddFolderLoading] = useState(false);
  const [addFileLoading, setAddFileLoading] = useState(false);
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
                loading={addFileLoading}
                icon={<FileAddOutlined />}
                onClick={async () => {
                  treeMenuRef.current?.addFile();
                }}
              ></Button>
              <Button
                type="text"
                loading={addFolderLoading}
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
                initialTreeData={[]}
                ref={treeMenuRef}
                onFolderAdd={async ({ title, parentKey }) => {
                  try {
                    setAddFolderLoading(true);
                    const result =
                      await projectGroupControllerCreateProjectGroup({
                        name: title,
                        parentGroupId: parentKey as number,
                      });
                    return result.id;
                  } finally {
                    setAddFolderLoading(false);
                  }
                }}
                onFileAdd={async ({ title, parentKey }) => {
                  try {
                    setAddFileLoading(true);
                    const result = await projectControllerCreateProject({
                      name: title,
                      projectGroupId: parentKey as number,
                    });
                    return result.id;
                  } finally {
                    setAddFileLoading(false);
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
