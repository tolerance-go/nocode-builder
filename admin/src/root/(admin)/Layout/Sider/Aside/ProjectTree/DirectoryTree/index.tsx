import { useAppStore } from "@/store";
import { projectTreeStore } from "@/stores";
import { projectTreeHistoryState } from "@/stores/projectTree";
import { css } from "@emotion/css";
import { useKeyPress } from "ahooks";
import { Tree } from "antd";
import React from "react";
import { useSnapshot } from "valtio";
import { Title } from "./Title";

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const { expandedKeys, containerHeight } = useSnapshot(
    projectTreeStore.projectTreeState,
  );
  const projectTreeData = useAppStore.use.projectStructureTreeData();

  useKeyPress(["Delete", "Backspace"], () => {
    projectTreeStore.projectTreeState.selectedKey &&
      projectTreeStore.removeItemAction(
        projectTreeStore.projectTreeState.selectedKey,
      );
  });

  useKeyPress(["F2"], () => {
    projectTreeStore.projectTreeState.selectedKey &&
      projectTreeStore.startNodeEditingAction(
        projectTreeStore.projectTreeState.selectedKey,
      );
  });

  useKeyPress(["ctrl.z"], () => {
    projectTreeHistoryState.undo();
  });

  useKeyPress(["ctrl.shift.z"], () => {
    projectTreeHistoryState.redo();
  });

  return (
    <DirectoryTree
      treeData={projectTreeData}
      height={containerHeight}
      virtual
      className={css`
        .ant-tree-node-content-wrapper {
          display: inline-flex;
          .ant-tree-title {
            flex-grow: 1;
          }
        }
      `}
      expandedKeys={expandedKeys as React.Key[]} // 受控展开状态
      onSelect={(keys) => {
        projectTreeStore.setSelectedKeyAction(
          (keys.length > 0 ? keys[0] : null) as string | null,
        );
      }}
      onExpand={(keys) => {
        projectTreeStore.setExpandedKeysAction(keys as string[]); // 更新展开状态
      }}
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};