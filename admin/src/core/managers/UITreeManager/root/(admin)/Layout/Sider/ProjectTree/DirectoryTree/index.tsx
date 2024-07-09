import {
  reduxStore,
  useAppDispatch,
  useAppSelector,
  删除所有选中的节点,
  取消指定的节点的选中状态,
  取消选中项目树容器,
  更新展开的节点是哪些,
  更新当前正在拖拽的节点,
  更新当前编辑节点是哪个并更新输入框的值,
  更新激活的节点的key,
  更新选中的节点是哪些,
  移动项目树节点并同步其他状态,
} from '@/core/managers/UIStoreManager';
import { useKeyPressEventByKeyboardJs } from '@/hooks';
import { 节点是不是文件 } from '@/utils';
import { css } from '@emotion/css';
import { theme, Tree } from 'antd';
import { Title } from './Title';
import { findNode } from '@/core/managers/UIStoreManager/store/utils/tree';

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

  useKeyPressEventByKeyboardJs(['delete'], () => {
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

  useKeyPressEventByKeyboardJs(['f2'], () => {
    所有已经选中的节点.length &&
      dispatch(
        更新当前编辑节点是哪个并更新输入框的值(
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
    <AntdDirectoryTree
      multiple
      treeData={项目节点树}
      height={节点树容器的高度}
      virtual
      draggable={{
        icon: false,
      }}
      allowDrop={(options) => {
        const state = reduxStore.getState();
        const { dropNode, dropPosition, dragNode } = options;

        // 如果拖动的是文件夹，放置的是文件，位置是之后
        // 那么禁止
        if (!dragNode.isLeaf && dropNode.isLeaf && dropPosition === 1) {
          return false;
        }

        // 如果拖动的是文件，放置的是文件夹
        if (!dropNode.isLeaf && dragNode.isLeaf) {
          // 如果放置到文件夹的前面
          // 那么禁止
          if (dropPosition === -1) {
            return false;
          }
          // 如果放置到文件夹的后面
          // 并且文件夹的后面也是文件夹
          // 那么禁止
          if (dropPosition === 1) {
            const 父节点key =
              state.projectTree.derived_节点到父节点的映射[dropNode.key];

            if (父节点key === undefined) {
              throw new Error('父节点数据不完整');
            }

            if (父节点key) {
              const 父节点 = findNode(state.projectTree.项目节点树, 父节点key);

              if (!父节点) {
                throw new Error('父节点数据不完整');
              }

              const 兄弟节点们 = 父节点.children;

              if (!兄弟节点们) {
                throw new Error('父节点数据不完整');
              }

              const dropIndex = 兄弟节点们.findIndex(
                (node) => node.key === dropNode.key,
              );

              if (dropIndex === -1) {
                throw new Error('父节点数据不完整');
              }

              if (兄弟节点们[dropIndex + 1]) {
                if (!兄弟节点们[dropIndex + 1]?.isLeaf) {
                  return false;
                }
              }
            } else {
              const dropIndex = state.projectTree.项目节点树.findIndex(
                (node) => node.key === dropNode.key,
              );

              if (dropIndex === -1) {
                throw new Error('父节点数据不完整');
              }

              const 放置节点下一个兄弟节点 =
                state.projectTree.项目节点树[dropIndex + 1];

              if (放置节点下一个兄弟节点) {
                if (!放置节点下一个兄弟节点.isLeaf) {
                  return false;
                }
              }
            }
          }
        }

        // 如果拖动为文件，放置是文件夹，放置位置为内部
        if (dragNode.isLeaf && !dropNode.isLeaf && dropPosition === 0) {
          // 并且放置文件夹内部开头存在文件夹
          // 那么禁止放置
          if (dropNode.children && dropNode.children.length) {
            if (!dropNode.children[0].isLeaf) {
              return false;
            }
          }
        }

        // 如果放置节点是文件，并且放置为内部
        // 那么禁止放置
        if (dropNode.isLeaf && dropPosition === 0) {
          return false;
        }

        return true;
      }}
      className={css`
        .ant-tree-treenode:not(.ant-tree-treenode-selected) {
          &:has(span.active) {
            &::before {
              background-color: ${token['blue-2']};
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
          reduxStore.getState().projectTree.connected_树节点key到节点数据的映射[
            node.key
          ];

        if (!nodeData) {
          throw new Error('节点数据不完整');
        }
        if (节点是不是文件(nodeData)) {
          dispatch(取消指定的节点的选中状态(node.key));
        }
      }}
      onDragStart={(info) => {
        dispatch(更新当前正在拖拽的节点(info.node.key));
      }}
      onDragEnd={() => {
        dispatch(更新当前正在拖拽的节点(null));
      }}
      onDrop={(info) => {
        // 有时候不会触发 onDragEnd，所以要在 drop 的也触发
        dispatch(更新当前正在拖拽的节点(null));

        const dropKey = info.node.key;

        /**
         * dropToGap 解释
         * true：表示将拖拽的节点放置在目标节点的上方或下方（即与目标节点成为同级节点）。
         * false：表示将拖拽的节点放置在目标节点的内部（即成为目标节点的子节点）。
         */
        if (info.dropToGap === false) {
          if (info.node.isLeaf) {
            return;
          }

          dispatch(
            移动项目树节点并同步其他状态({
              nodeKey: info.dragNode.key,
              newParentKey: dropKey,
              newIndex: 0,
            }),
          );
        } else {
          const {
            projectTree: { derived_节点到父节点的映射: 节点到父节点的映射 },
          } = reduxStore.getState();

          const 父节点 = 节点到父节点的映射[dropKey];

          if (父节点 === undefined) {
            throw new Error('父节点数据不完整');
          }

          let finalIndex = info.dropPosition;

          if (info.dropPosition === -1) {
            finalIndex = 0;
          }

          dispatch(
            移动项目树节点并同步其他状态({
              nodeKey: info.dragNode.key,
              newParentKey: 父节点,
              newIndex: finalIndex,
            }),
          );
        }
      }}
      onClick={(_event, info) => {
        dispatch(更新激活的节点的key(info.key));
        dispatch(取消选中项目树容器());
      }}
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};
