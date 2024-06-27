import { getProjectTreeData } from "@/services/getProjectTreeData";
import { projectTreeStore } from "@/stores";
import { ProjectTreeDataNode } from "@/types/tree";
import { css } from "@emotion/css";
import type { GetProps } from "antd";
import { Tree } from "antd";
import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { Title } from "./Title";

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const { treeData, expandedKeys, containerHeight } = useSnapshot(
    projectTreeStore.projectTreeState,
  );

  useEffect(() => {
    projectTreeStore.loadTreeDataAction();
  }, []);

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
        onSelect={(keys) => {
          projectTreeStore.setSelectedKeyAction(
            (keys.length > 0 ? keys[0] : null) as string | null,
          );
        }}
        onExpand={(keys) => {
          projectTreeStore.setExpandedKeysAction(keys as string[]); // 更新展开状态
        }}
        treeData={treeData as ProjectTreeDataNode[]}
        titleRender={(nodeData) => (
          <Title
            title={nodeData.title}
            isEditing={nodeData.isEditing}
            onFinish={
              // nodeData.type == "file" ? handleFileFinish : handleFolderFinish
              () => {}
            }
            newKey={nodeData.key}
          />
        )}
      />
    </div>
  );
};
