import {
  removeProjectStructureTreeNodeWithCheck,
  更新当前编辑节点是哪个,
  updateExpandedKeys,
  updateSelectedProjectStructureTreeNodes,
  useAppDispatch,
  useAppSelector,
  reduxStore,
  取消指定的节点的选中状态,
} from '@/core/managers/UIStoreManager';
import { useKeyPress } from '@/hooks';
import { css } from '@emotion/css';
import { theme, Tree } from 'antd';
import { Title } from './Title';
import { 节点是不是文件 } from '@/utils';

const { DirectoryTree } = Tree;

export const TreeMenu = () => {
  const { token } = theme.useToken();
  const 节点树容器的高度 = useAppSelector(
    (state) => state.projectTree.节点树容器的高度,
  );
  const 项目节点树 = useAppSelector((state) => state.projectTree.项目节点树);
  const 所有已经选中的节点 = useAppSelector(
    (state) => state.projectTree.所有已经选中的节点,
  );

  const dispatch = useAppDispatch();
  const expandedKeys = useAppSelector(
    (state) => state.projectTree.所有展开的节点的key,
  );

  useKeyPress(['Delete', 'Backspace'], () => {
    所有已经选中的节点.length &&
      dispatch(
        removeProjectStructureTreeNodeWithCheck(
          所有已经选中的节点[所有已经选中的节点.length - 1],
        ),
      );
  });

  useKeyPress(['f2'], () => {
    所有已经选中的节点.length &&
      dispatch(
        更新当前编辑节点是哪个(
          所有已经选中的节点[所有已经选中的节点.length - 1],
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
      onDoubleClick={(_e, node) => {
        const nodeData =
          reduxStore.getState().projectTree.树节点key到节点数据的映射[node.key];

        if (!nodeData) {
          throw new Error('节点数据不完整');
        }
        if (节点是不是文件(nodeData)) {
          dispatch(取消指定的节点的选中状态(node.key));
        }
      }}
      treeData={项目节点树}
      height={节点树容器的高度}
      virtual
      className={css`
        .ant-tree-treenode {
          :has(span.hosted) {
            &::before {
              background-color: ${token.blue2};
            }
          }
        }
        .ant-tree-node-content-wrapper {
          display: inline-flex;
          .ant-tree-title {
            flex-grow: 1;
          }
        }
      `}
      selectedKeys={所有已经选中的节点}
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
