import React from "react";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { css } from "@emotion/css";

const treeData: TreeDataNode[] = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const TreeList: React.FC = () => {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <Tree
      className={css`
        & {
          border-radius: 0;
        }
      `}
      blockNode
      defaultExpandedKeys={["0-0-0", "0-0-1"]}
      defaultSelectedKeys={["0-0-0", "0-0-1"]}
      defaultCheckedKeys={["0-0-0", "0-0-1"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
    />
  );
};

export default TreeList;
