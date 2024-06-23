import React from "react";
import { Tree } from "antd";
import type { GetProps, TreeDataNode } from "antd";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { SEARCH_PARAMS } from "@/constants";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const treeData: TreeDataNode[] = [
  {
    title: "parent33333 0",
    key: "0-0",
    selectable: false,
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    selectable: false,
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];

const AppTreeList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
