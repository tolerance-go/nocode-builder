import { useAppStore } from '@/store';
import { css } from '@emotion/css';
import { useKeyPress } from 'ahooks';
import { Tree } from 'antd';
import { Title } from './Title';

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const containerHeight = useAppStore.use.containerHeight();
  const projectTreeData = useAppStore.use.projectStructureTreeData();
  const selectProjectStructureTreeNodes =
    useAppStore.use.updateSelectedProjectStructureTreeNodes();
  const selectedProjectStructureTreeNodes =
    useAppStore.use.selectedProjectStructureTreeNodes();
  const expandedKeys = useAppStore.use.expandedKeys();
  const updateExpandedKeys = useAppStore.use.updateExpandedKeys();
  const updateEditingProjectStructureTreeNode =
    useAppStore.use.updateEditingProjectStructureTreeNode();
  const removeProjectStructureTreeNodeWithCheck =
    useAppStore.use.removeProjectStructureTreeNodeWithCheck();

  useKeyPress(['Delete', 'Backspace'], () => {
    selectedProjectStructureTreeNodes.length &&
      removeProjectStructureTreeNodeWithCheck(
        selectedProjectStructureTreeNodes[
          selectedProjectStructureTreeNodes.length - 1
        ],
      );
  });

  useKeyPress(['F2'], () => {
    selectedProjectStructureTreeNodes.length &&
      updateEditingProjectStructureTreeNode(
        selectedProjectStructureTreeNodes[
          selectedProjectStructureTreeNodes.length - 1
        ],
      );
  });

  // useKeyPress(["ctrl.z"], () => {
  //   projectTreeHistoryState.undo();
  // });

  // useKeyPress(["ctrl.shift.z"], () => {
  //   projectTreeHistoryState.redo();
  // });

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
