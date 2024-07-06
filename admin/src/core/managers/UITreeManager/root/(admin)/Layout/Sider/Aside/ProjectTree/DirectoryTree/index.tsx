import {
  reduxStore,
  useAppDispatch,
  useAppSelector,
  删除所有选中的节点,
  取消指定的节点的选中状态,
  更新展开的节点是哪些,
  更新当前编辑节点是哪个,
  更新选中的节点是哪些,
  退出当前正在编辑的节点,
} from '@/core/managers/UIStoreManager';
import { useKeyPress } from '@/hooks';
import { 节点是不是文件 } from '@/utils';
import { css } from '@emotion/css';
import { theme, Tree } from 'antd';
import { Title } from './Title';

const { DirectoryTree: AntdDirectoryTree } = Tree;

export const DirectoryTree = () => {
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

  useKeyPress(['delete'], () => {
    const {
      projectTree: { 所有已经选中的节点, 当前正在编辑的项目树节点的key },
    } = reduxStore.getState();

    if (!所有已经选中的节点.length) return;

    if (
      当前正在编辑的项目树节点的key &&
      所有已经选中的节点.includes(当前正在编辑的项目树节点的key)
    ) {
      return;
    }

    dispatch(删除所有选中的节点());
  });

  useKeyPress(['f2'], () => {
    所有已经选中的节点.length &&
      dispatch(
        更新当前编辑节点是哪个(
          所有已经选中的节点[所有已经选中的节点.length - 1],
        ),
      );
  });

  useKeyPress(['esc'], () => {
    if (所有已经选中的节点.length) {
      dispatch(退出当前正在编辑的节点());
    }
  });

  // useKeyPress(["ctrl.z"], () => {
  //   projectTreeHistoryState.undo();
  // });

  // useKeyPress(["ctrl.shift.z"], () => {
  //   projectTreeHistoryState.redo();
  // });

  return (
    <AntdDirectoryTree
      multiple
      treeData={项目节点树}
      height={节点树容器的高度}
      virtual
      className={css`
        .ant-tree-treenode {
          :has(span.prev-selected) {
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
        dispatch(更新选中的节点是哪些(keys as string[]));
      }}
      onExpand={(keys) => {
        dispatch(更新展开的节点是哪些(keys as string[])); // 更新展开状态
      }}
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
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};
