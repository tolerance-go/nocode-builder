import { ProjectTypeEnum, WidgetPlatformTypeEnum } from '@/_gen/models';
import { ViewKey } from '@/common/types';
import { projectDetailIsViewProjectDetail } from '@/common/utils';
import {
  findNode,
  useAppDispatch,
  useAppSelector,
  节点是不是文件,
} from '@/modules/ui/界面状态仓库模块';
import {
  DirectoryTreeNodeTypeEnum,
  ProjectTreeDataNode,
} from '@/modules/ui/界面状态仓库模块/types';
import {
  use图标管理者,
  use界面状态管理者,
} from '@/modules/ui/界面组件树管理模块/hooks';
import { css } from '@emotion/css';
import { Badge, theme, Tree } from 'antd';
import { Title } from './Title';

const { DirectoryTree: AntdDirectoryTree } = Tree;

export const DirectoryTree = () => {
  const {
    store: reduxStore,
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = use界面状态管理者();

  const 图标管理者实例 = use图标管理者();

  const { token } = theme.useToken();
  const 节点树容器的高度 = useAppSelector(
    (state) => state.projectTree.节点树容器的高度,
  );
  const 项目节点树 = useAppSelector((state) => state.projectTree.项目结构树);
  const 所有已经选中的节点 = useAppSelector(
    (state) => state.projectTree.所有已经选中的节点,
  );

  const dispatch = useAppDispatch();
  const expandedKeys = useAppSelector(
    (state) => state.projectTree.所有展开的节点的key,
  );

  return (
    <AntdDirectoryTree<ProjectTreeDataNode>
      multiple
      treeData={项目节点树}
      height={节点树容器的高度}
      virtual
      showIcon
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
              const 父节点 = findNode(state.projectTree.项目结构树, 父节点key);

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
              const dropIndex = state.projectTree.项目结构树.findIndex(
                (node) => node.key === dropNode.key,
              );

              if (dropIndex === -1) {
                throw new Error('父节点数据不完整');
              }

              const 放置节点下一个兄弟节点 =
                state.projectTree.项目结构树[dropIndex + 1];

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
        .ant-tree-treenode {
          &:has(span.focused) {
            &::before {
              border: 1px solid ${token['blue-6']};
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
        dispatch(projectTreeActions.更新选中的节点是哪些(keys as string[]));
      }}
      onExpand={(keys) => {
        dispatch(projectTreeActions.更新展开的节点是哪些(keys as string[])); // 更新展开状态
      }}
      onDoubleClick={(_e, node) => {
        const nodeData =
          reduxStore.getState().projectTree.项目树节点数据[node.key];

        if (!nodeData) {
          throw new Error('节点数据不完整');
        }
        if (节点是不是文件(nodeData)) {
          dispatch(projectTreeActions.取消指定的节点的选中状态(node.key));
        }
      }}
      onDragStart={(info) => {
        dispatch(projectTreeActions.更新当前正在拖拽的节点(info.node.key));
      }}
      onDragEnd={() => {
        dispatch(projectTreeActions.更新当前正在拖拽的节点(null));
      }}
      onDrop={(info) => {
        const {
          projectTree: {
            derived_节点到父节点的映射: 节点到父节点的映射,
            所有已经选中的节点,
          },
        } = reduxStore.getState();

        // 有时候不会触发 onDragEnd，所以要在 drop 的也触发
        dispatch(projectTreeActions.更新当前正在拖拽的节点(null));

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

          let dragKeys: ViewKey[] = [info.dragNode.key];

          // 如果移动的节点是选中的
          // 并且选中的节点包含多个
          // 那么使用批量移动节点操作
          if (
            所有已经选中的节点.includes(info.dragNode.key) &&
            所有已经选中的节点.length > 1
          ) {
            dragKeys = 所有已经选中的节点;
          }

          dispatch(
            projectTreeActions.移动节点({
              nodeKeys: dragKeys,
              newParentKey: dropKey,
              newIndex: 0,
            }),
          );
        } else {
          const 父节点 = 节点到父节点的映射[dropKey];

          if (父节点 === undefined) {
            throw new Error('父节点数据不完整');
          }

          let finalIndex = info.dropPosition;

          if (info.dropPosition === -1) {
            finalIndex = 0;
          }

          let dragKeys: ViewKey[] = [info.dragNode.key];

          // 如果移动的节点是选中的
          // 并且选中的节点包含多个
          // 那么使用批量移动节点操作
          if (
            所有已经选中的节点.includes(info.dragNode.key) &&
            所有已经选中的节点.length > 1
          ) {
            dragKeys = 所有已经选中的节点;
          }

          dispatch(
            projectTreeActions.移动节点({
              nodeKeys: dragKeys,
              newParentKey: 父节点,
              newIndex: finalIndex,
            }),
          );
        }
      }}
      onClick={(_event, info) => {
        dispatch(projectTreeActions.更新激活的节点的key(info.key));
        dispatch(projectTreeActions.更新当前聚焦的节点key(info.key));
        dispatch(projectTreeActions.取消选中项目树容器());
      }}
      onRightClick={({ node }) => {
        dispatch(projectTreeActions.更新当前聚焦的节点key(node.key));
      }}
      // https://github.com/ant-design/ant-design/issues/49813
      icon={(nodeProps: unknown) => {
        const {
          projectTree: { 项目树节点数据: connected_树节点key到节点数据的映射 },
        } = reduxStore.getState();
        const { eventKey: nodeKey, expanded } = nodeProps as {
          eventKey: string;
          expanded: boolean;
        };

        if (nodeKey in connected_树节点key到节点数据的映射 === false) {
          return;
        }

        const nodeData = connected_树节点key到节点数据的映射[nodeKey];
        if (nodeData.type === DirectoryTreeNodeTypeEnum.File) {
          if (nodeData.projectType === ProjectTypeEnum.View) {
            if (!projectDetailIsViewProjectDetail(nodeData.projectDetail)) {
              throw new Error('error data');
            }

            if (
              nodeData.projectDetail.platform === WidgetPlatformTypeEnum.PcWeb
            ) {
              return (
                <Badge
                  offset={[
                    -((token.fontSize / 14) * 3),
                    (token.fontSize / 14) * 13,
                  ]}
                  count={图标管理者实例.根据id获取组件('PcWeb平台logo', {
                    style: {
                      fontSize: (token.fontSize / 14) * 10,
                      color: token.blue6,
                    },
                  })}
                >
                  {图标管理者实例.根据id获取组件('视图项目节点')}
                </Badge>
              );
            }

            if (
              nodeData.projectDetail.platform ===
              WidgetPlatformTypeEnum.DesktopClient
            ) {
              return (
                <Badge
                  offset={[
                    -((token.fontSize / 14) * 3),
                    (token.fontSize / 14) * 13,
                  ]}
                  count={图标管理者实例.根据id获取组件(
                    'DesktopClient平台logo',
                    {
                      style: {
                        fontSize: (token.fontSize / 14) * 10,
                        color: token.purple8,
                      },
                    },
                  )}
                >
                  {图标管理者实例.根据id获取组件('视图项目节点')}
                </Badge>
              );
            }

            if (
              nodeData.projectDetail.platform ===
              WidgetPlatformTypeEnum.MiniProgram
            ) {
              return (
                <Badge
                  offset={[
                    -((token.fontSize / 14) * 3),
                    (token.fontSize / 14) * 13,
                  ]}
                  count={图标管理者实例.根据id获取组件('MiniProgram平台logo', {
                    style: {
                      fontSize: (token.fontSize / 14) * 10,
                      color: token.green6,
                    },
                  })}
                >
                  {图标管理者实例.根据id获取组件('视图项目节点')}
                </Badge>
              );
            }

            if (
              nodeData.projectDetail.platform ===
              WidgetPlatformTypeEnum.MobileWeb
            ) {
              return (
                <Badge
                  offset={[
                    -((token.fontSize / 14) * 3),
                    (token.fontSize / 14) * 13,
                  ]}
                  count={图标管理者实例.根据id获取组件('MobileWeb平台logo', {
                    style: {
                      fontSize: (token.fontSize / 14) * 10,
                      color: token.blue6,
                    },
                  })}
                >
                  {图标管理者实例.根据id获取组件('视图项目节点')}
                </Badge>
              );
            }

            if (
              nodeData.projectDetail.platform ===
              WidgetPlatformTypeEnum.NativeMobile
            ) {
              return (
                <Badge
                  offset={[
                    -((token.fontSize / 14) * 3),
                    (token.fontSize / 14) * 13,
                  ]}
                  count={图标管理者实例.根据id获取组件('NativeMobile平台logo', {
                    style: {
                      fontSize: (token.fontSize / 14) * 10,
                      color: token.purple8,
                    },
                  })}
                >
                  {图标管理者实例.根据id获取组件('视图项目节点')}
                </Badge>
              );
            }

            return 图标管理者实例.根据id获取组件('视图项目节点');
          }
          if (nodeData.projectType === ProjectTypeEnum.DataTable) {
            return 图标管理者实例.根据id获取组件('数据表项目节点');
          }
          if (nodeData.projectType === ProjectTypeEnum.Bluemap) {
            return 图标管理者实例.根据id获取组件('蓝图项目节点');
          }
        } else {
          if (expanded) {
            return 图标管理者实例.根据id获取组件('项目组文件夹展开中');
          }
          return 图标管理者实例.根据id获取组件('项目组文件夹');
        }
      }}
      titleRender={(nodeData) => <Title nodeKey={nodeData.key} />}
    />
  );
};
