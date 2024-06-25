import { authControllerLogin } from "@/services/api/authControllerLogin";
import { projectGroupControllerCreateProjectGroup } from "@/services/api/projectGroupControllerCreateProjectGroup";
import { FolderAddOutlined } from "@ant-design/icons";
import type { GetProps, TreeDataNode } from "antd";
import { Button, Flex, Tree, theme } from "antd";
import React, { useState } from "react";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const treeData: TreeDataNode[] = [
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
];

export const TreeMenu: React.FC = () => {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Flex
        justify="end"
        style={{
          padding: `${token.sizeXXS}px ${token.sizeXS}px`,
          border: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Button
          size="small"
          type="text"
          loading={loading}
          icon={<FolderAddOutlined />}
          onClick={async () => {
            try {
              setLoading(true);
              await projectGroupControllerCreateProjectGroup({
                username: values.username,
                password: values.password,
              });
            } finally {
              setLoading(false);
            }
          }}
        ></Button>
      </Flex>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    </div>
  );
};
