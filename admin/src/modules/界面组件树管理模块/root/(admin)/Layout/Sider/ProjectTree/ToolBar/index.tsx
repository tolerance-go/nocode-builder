import { ProjectTypeEnum } from '@/_gen/models';
import {
  useAppSelector,
  useAppDispatch,
  查询项目树中的节点,
  节点是不是文件,
  节点是不是文件夹,
} from '@/modules/界面状态管理器模块';
import {
  ProjectTreeNodeDataRecordItem,
  ProjectStructureTreeDataNode,
  DirectoryTreeNodeTypeEnum,
} from '@/modules/界面状态管理器模块/types';
import { 组件标识, 组件类名 } from '@/modules/界面组件树管理模块/constants';
import {
  use界面状态管理者,
  use图标管理者,
} from '@/modules/界面组件树管理模块/hooks';
import { ProjectType } from '@/modules/界面组件树管理模块/types';

import { FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { 测试标识 } from '@/common/constants';
import { Button, Dropdown, Flex, Space, theme } from 'antd';

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const 找到同层最后一个文件夹的位置 = (
  nodes: ProjectTreeNodeDataRecordItem[],
): number => {
  return nodes.findLastIndex((node) => node.type === 'folder');
};

export const ToolBar = () => {
  const {
    store: reduxStore,
    slices: {
      projectTree: { actions: projectTreeActions },
    },
  } = use界面状态管理者();

  const 图标管理者实例 = use图标管理者();
  const { token } = theme.useToken();

  const projectTreeTimeLineVisible = useAppSelector(
    (state) => state.layout.projectTreeTimeLineVisible,
  );
  const selectedProjectStructureTreeNodes = useAppSelector(
    (state) => state.projectTree.所有已经选中的节点,
  );
  const projectStructureTreeData = useAppSelector(
    (state) => state.projectTree.项目结构树,
  );
  const projectTreeDataRecord = useAppSelector(
    (state) => state.projectTree.项目树节点数据,
  );
  const nodeParentKeyRecord = useAppSelector(
    (state) => state.projectTree.derived_节点到父节点的映射,
  );
  const dispatch = useAppDispatch();

  const selectedKey = selectedProjectStructureTreeNodes.length
    ? selectedProjectStructureTreeNodes[
        selectedProjectStructureTreeNodes.length - 1
      ]
    : null;

  const 在指定节点下插入新文件夹 = (target: ProjectStructureTreeDataNode) => {
    const newKey = Math.random() + '';
    dispatch(
      projectTreeActions.插入节点({
        parentKey: target.key,
        node: {
          key: newKey,
        },
        index: 0,
        recordItem: {
          title: '',
          type: DirectoryTreeNodeTypeEnum.Folder,
        },
      }),
    );
  };

  const 在指定节点下插入新文件 = (
    target: ProjectStructureTreeDataNode,
    projectType: ProjectType,
  ) => {
    const folderIndex = 找到同层最后一个文件夹的位置(
      (target.children ?? []).map((node) => {
        const recordItem = projectTreeDataRecord[node.key];
        if (!recordItem) {
          throw new Error('数据不完整。');
        }
        return recordItem;
      }),
    );
    const newKey = Math.random() + '';

    dispatch(
      projectTreeActions.插入节点({
        parentKey: target.key,
        node: {
          isLeaf: true,
          key: newKey,
        },
        index: folderIndex + 1,
        recordItem: {
          title: '',
          type: DirectoryTreeNodeTypeEnum.File,
          projectType: projectType,
        },
      }),
    );
  };

  const 在根节点下插入新文件 = (projectFileType: ProjectType) => {
    const folderIndex = 找到同层最后一个文件夹的位置(
      projectStructureTreeData.map((node) => {
        const recordItem = projectTreeDataRecord[node.key];
        if (!recordItem) {
          throw new Error('数据不完整。');
        }
        return recordItem;
      }),
    );

    const newKey = Math.random() + '';

    dispatch(
      projectTreeActions.插入节点({
        parentKey: null,
        node: {
          key: newKey,
          isLeaf: true,
        },
        index: folderIndex + 1,
        recordItem: {
          title: '',
          type: DirectoryTreeNodeTypeEnum.File,
          projectType: projectFileType,
        },
      }),
    );
  };

  const 在根节点下面插入新文件夹 = () => {
    const newKey = Math.random() + '';
    dispatch(
      projectTreeActions.插入节点({
        parentKey: null,
        node: {
          key: newKey,
        },
        index: 0,
        recordItem: {
          type: DirectoryTreeNodeTypeEnum.Folder,
          title: '',
        },
      }),
    );
  };

  /**
   * 处理点击添加文件夹的回调函数
   * @param event - 事件对象
   */
  const 处理项目组新建按钮点击事件 = async () => {
    if (!selectedKey) {
      在根节点下面插入新文件夹();
      return;
    }

    const selectedRecordItem = projectTreeDataRecord[selectedKey];
    const selectedNode = 查询项目树中的节点(
      reduxStore.getState().projectTree,
      selectedKey,
    );

    if (!selectedRecordItem) {
      throw new Error('数据不完整。');
    }

    if (节点是不是文件夹(selectedRecordItem)) {
      if (selectedNode) {
        在指定节点下插入新文件夹(selectedNode);
      }
    } else if (节点是不是文件(selectedRecordItem)) {
      const parentKey = nodeParentKeyRecord[selectedKey];
      if (parentKey) {
        const parent = 查询项目树中的节点(
          reduxStore.getState().projectTree,
          parentKey,
        );
        if (parent) {
          在指定节点下插入新文件夹(parent);
        }
      } else {
        在根节点下面插入新文件夹();
      }
    }
  };

  const handleProjectFileCreateBtnClick = async (
    projectFileType: ProjectType,
  ) => {
    if (!selectedKey) {
      在根节点下插入新文件(projectFileType);
      return;
    }

    const selectedRecordItem = projectTreeDataRecord[selectedKey];
    const selectedNode = 查询项目树中的节点(
      reduxStore.getState().projectTree,
      selectedKey,
    );

    if (!selectedRecordItem) {
      throw new Error('数据不完整。');
    }
    if (节点是不是文件夹(selectedRecordItem)) {
      if (selectedNode) {
        在指定节点下插入新文件(selectedNode, projectFileType);
      }
    } else if (节点是不是文件(selectedRecordItem)) {
      const parentKey = nodeParentKeyRecord[selectedKey];

      if (parentKey) {
        const parent = 查询项目树中的节点(
          reduxStore.getState().projectTree,
          parentKey,
        );
        if (parent) {
          在指定节点下插入新文件(parent, projectFileType);
        }
      } else {
        在根节点下插入新文件(projectFileType);
      }
    }
  };

  return (
    <Flex
      justify="end"
      style={{
        padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Space>
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: (
                  <span data-test-id={测试标识.创建视图项目节点的菜单项标题}>
                    视图
                  </span>
                ),
                onClick: () =>
                  handleProjectFileCreateBtnClick(ProjectTypeEnum.View),
                icon: 图标管理者实例.根据id获取组件('视图项目节点'),
                className: 组件类名.创建视图项目节点的菜单项,
              },
              {
                key: 'data-table',
                label: (
                  <span data-test-id={测试标识.创建数据表项目节点的菜单项标题}>
                    数据表
                  </span>
                ),
                icon: 图标管理者实例.根据id获取组件('数据表项目节点'),
                onClick: () =>
                  handleProjectFileCreateBtnClick(ProjectTypeEnum.DataTable),
              },
              {
                key: 'bluemap',
                label: (
                  <span data-test-id={测试标识.创建蓝图项目节点的菜单项标题}>
                    蓝图
                  </span>
                ),
                icon: 图标管理者实例.根据id获取组件('蓝图项目节点'),
                onClick: () =>
                  handleProjectFileCreateBtnClick(ProjectTypeEnum.Bluemap),
              },
            ],
          }}
          placement="bottom"
        >
          <Button
            id={组件标识.创建项目节点的按钮}
            data-test-id={测试标识.创建项目节点的按钮}
            type="text"
            disabled={projectTreeTimeLineVisible}
            // loading={addFileLoading}
            icon={<PlusOutlined />}
          ></Button>
        </Dropdown>
        <Button
          type="text"
          id={组件标识.创建项目组节点的按钮}
          data-test-id={测试标识.创建项目组节点的按钮}
          disabled={projectTreeTimeLineVisible}
          // loading={addFolderLoading}
          icon={<FolderAddOutlined />}
          onClick={处理项目组新建按钮点击事件}
        ></Button>
      </Space>
    </Flex>
  );
};
