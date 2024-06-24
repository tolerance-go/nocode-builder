import { IconHoverableButton } from "@/components/BaseButton";
import stores from "@/stores";
import { AppData } from "@/types";
import { DeepReadonly } from "@/utils/types";
import { AppstoreOutlined, MoreOutlined } from "@ant-design/icons";
import type { GetProps, TreeDataNode } from "antd";
import { Button, Dropdown, Menu, Tree } from "antd";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { buildTreeData } from "./utils/buildTreeData";
import { css, cx } from "@emotion/css";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const AppTreeList: React.FC = () => {
  const appsSnapshot = useSnapshot(stores.apps.states.apps);
  const appGroupsSnapshot = useSnapshot(stores.apps.states.appGroups);
  const navigate = useNavigate();
  const match = useMatch("/apps/:id?");

  console.log("match", match);

  // 将 apps 和 appGroups 转换为 treeData
  const treeData = buildTreeData(appsSnapshot.list, appGroupsSnapshot.list);

  const onSelect: DirectoryTreeProps["onSelect"] = (_keys, info) => {
    if (info.selected) {
      navigate(`/apps/${info.node.key}`);
    }
  };

  return (
    <DirectoryTree
      showIcon={false}
      titleRender={(data) => {
        return (
          <Dropdown
            trigger={["contextMenu"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: "1st item",
                },
                {
                  key: "2",
                  label: "2nd item",
                },
                {
                  key: "3",
                  label: "3rd item",
                },
              ],
            }}
          >
            <div className="flex group justify-between pr-1">
              {typeof data.title === "function" ? data.title(data) : data.title}
            </div>
          </Dropdown>
        );
      }}
      defaultExpandAll
      selectedKeys={match?.params.id ? [match?.params.id] : undefined}
      onSelect={onSelect}
      treeData={[
        {
          key: "all",
          title: "全部",
          isLeaf: true,
          icon: <AppstoreOutlined />,
        } as TreeDataNode,
        ...treeData,
      ]}
    />
  );
};

export default AppTreeList;
