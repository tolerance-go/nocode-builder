import stores from "@/stores";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { buildTreeData } from "./utils/buildTreeData";
import { AppstoreOutlined } from "@ant-design/icons";

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

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      selectedKeys={match?.params.id ? [match?.params.id] : undefined}
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={[
        {
          key: "all",
          title: "全部",
          isLeaf: true,
          icon: <AppstoreOutlined />
        },
        ...treeData,
      ]}
    />
  );
};

export default AppTreeList;
