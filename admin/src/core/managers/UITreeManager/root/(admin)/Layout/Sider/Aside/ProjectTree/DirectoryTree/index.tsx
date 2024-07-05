import {
  removeProjectStructureTreeNodeWithCheck,
  更新当前编辑节点是哪个,
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
    (state) => state.projectTree.节点树容器的高度,
  );
  const projectStructureTreeData = useAppSelector(
    (state) => state.projectTree.项目节点树,
  );
  const selectedProjectStructureTreeNodes = useAppSelector(
    (state) => state.projectTree.所有已经选中的节点,
  );

  const dispatch = useAppDispatch();
  const expandedKeys = useAppSelector(
    (state) => state.projectTree.所有展开的节点的key,
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
        更新当前编辑节点是哪个(
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
