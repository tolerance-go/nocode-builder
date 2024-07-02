import {
  removeProjectStructureTreeNodeWithCheck,
  updateEditingProjectStructureTreeNode,
  updateExpandedKeys,
  updateSelectedProjectStructureTreeNodes,
  useAppDispatch,
  useAppSelector,
} from '@/core/managers/UIStoreManager';
import { useKeyPress } from '@/hooks';
import { css } from '@emotion/css';
import { Tree } from 'antd';
import { Title } from './Title';

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const containerHeight = useAppSelector(
    (state) => state.projectTree.containerHeight,
  );
  const projectStructureTreeData = useAppSelector(
    (state) => state.projectTree.projectStructureTreeData,
  );
  const selectedProjectStructureTreeNodes = useAppSelector(
    (state) => state.projectTree.selectedProjectStructureTreeNodes,
  );

  const dispatch = useAppDispatch();
  const expandedKeys = useAppSelector(
    (state) => state.projectTree.expandedKeys,
  );

  useKeyPress(['Delete', 'Backspace'], () => {
    selectedProjectStructureTreeNodes.length &&
      dispatch(
        removeProjectStructureTreeNodeWithCheck(
          selectedProjectStructureTreeNodes[
            selectedProjectStructureTreeNodes.length - 1
          ],
        ),
      );
  });

  useKeyPress(['F2'], () => {
    selectedProjectStructureTreeNodes.length &&
      dispatch(
        updateEditingProjectStructureTreeNode(
          selectedProjectStructureTreeNodes[
            selectedProjectStructureTreeNodes.length - 1
          ],
        ),
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
      treeData={projectStructureTreeData}
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
        dispatch(updateSelectedProjectStructureTreeNodes(keys as string[]));
      }}
      onExpand={(keys) => {
        dispatch(updateExpandedKeys(keys as string[])); // 更新展开状态
      }}
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};
