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
  const { containerHeight } = useSnapshot(projectTreeStore.projectTreeState);
  const projectTreeData = useAppStore.use.projectStructureTreeData();
  const selectProjectStructureTreeNodes =
    useAppStore.use.updateSelectedProjectStructureTreeNodes();
  const selectedProjectStructureTreeNodes =
    useAppStore.use.selectedProjectStructureTreeNodes();
  const expandedKeys = useAppStore.use.expandedKeys();
  const updateExpandedKeys = useAppStore.use.updateExpandedKeys();

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
      multiple
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
      selectedKeys={selectedProjectStructureTreeNodes}
      expandedKeys={expandedKeys}
      onSelect={(keys) => {
        selectProjectStructureTreeNodes(keys as string[]);
      }}
      onExpand={(keys) => {
        updateExpandedKeys(keys as string[]); // 更新展开状态
      }}
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};
