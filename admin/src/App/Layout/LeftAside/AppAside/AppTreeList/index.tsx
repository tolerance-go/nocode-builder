import { SEARCH_PARAMS } from "@/constants";
import stores from "@/stores";
import { updateSearchParams } from "@/utils/updateSearchParams";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { buildTreeData } from "./utils/buildTreeData";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const AppTreeList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appsSnapshot = useSnapshot(stores.apps.states.apps);
  const appGroupsSnapshot = useSnapshot(stores.apps.states.appGroups);

  // 将 apps 和 appGroups 转换为 treeData
  const treeData = buildTreeData(appsSnapshot.list, appGroupsSnapshot.list);

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
    setSearchParams(
      updateSearchParams(searchParams, {
        [SEARCH_PARAMS.APP.IS_TEMPLATE]: undefined,
      })
    );
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default AppTreeList;
