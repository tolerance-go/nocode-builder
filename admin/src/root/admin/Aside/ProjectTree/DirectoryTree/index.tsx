import { projectTreeStore } from "@/stores";
import { ProjectTreeDataNode } from "@/types/tree";
import { css } from "@emotion/css";
import { Tree } from "antd";
import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { Title } from "./Title";
import { useKeyPress } from "@/hooks/useKeyPress";

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const { treeData, expandedKeys, containerHeight } = useSnapshot(
    projectTreeStore.projectTreeState,
  );

  useEffect(() => {
    projectTreeStore.loadTreeDataAction();
  }, []);

  useKeyPress(["Delete", "Backspace"], () => {
    projectTreeStore.projectTreeState.selectedKey &&
      projectTreeStore.removeNodeAction(
        projectTreeStore.projectTreeState.selectedKey,
      );
  });

  useKeyPress(["F2"], () => {
    projectTreeStore.projectTreeState.selectedKey &&
      projectTreeStore.switchNodeEditing(
        projectTreeStore.projectTreeState.selectedKey,
      );
  });

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
