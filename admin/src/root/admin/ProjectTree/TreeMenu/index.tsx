import { CustomTreeDataNode } from "@/types/tree";
import { css } from "@emotion/css";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React from "react";
import { useSnapshot } from "valtio";
import { TitleComponent } from "./TitleComponent";
import { projectsStoresActions, projectsStores } from "@/stores/project";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const { treeData, expandedKeys, containerHeight } = useSnapshot(
    projectsStores.treeStore,
  );

  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
    projectsStoresActions.setSelectedKeyAction(keys.length > 0 ? keys[0] : null); // 更新选中节点的状态
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys) => {
    projectsStoresActions.setExpandedKeysAction(keys); // 更新展开状态
  };

  const handleFileFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    projectsStoresActions.handleFileFinishAction(e, key, "New File");
  };

  const handleFolderFinish = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => {
    projectsStoresActions.handleFolderFinishAction(e, key, "New Folder");
  };

  return (
    <div>
      <DirectoryTree
        height={containerHeight}
        className={css`
          .ant-tree-node-content-wrapper {
            display: inline-flex;
            .ant-tree-title {
              flex-grow: 1;
            }
          }
        `}
        multiple
        expandedKeys={expandedKeys as React.Key[]} // 受控展开状态
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData as CustomTreeDataNode[]}
        titleRender={(nodeData) => (
          <TitleComponent
            title={nodeData.title as string}
            isEditing={(nodeData as CustomTreeDataNode).isEditing}
            onFinish={nodeData.isLeaf ? handleFileFinish : handleFolderFinish}
            newKey={nodeData.key}
          />
        )}
      />
    </div>
  );
};
