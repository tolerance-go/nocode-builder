import {
  reduxStore,
  showProjectTreeTimeLineAction,
  useAppDispatch,
  useAppSelector,
  在指定节点下插入新节点并同步更新其他数据,
} from '@/core/managers/UIStoreManager';
import { 查询项目树中的节点 } from '@/core/managers/UIStoreManager/store/utils';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { 节点是不是文件, 节点是不是文件夹 } from '@/utils';
import {
  FileAddOutlined,
  FolderAddOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { TEST_IDS } from '@cypress/shared/constants';
import { Button, Flex, Space, theme } from 'antd';

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const 找到同层最后一个文件夹的位置 = (
  nodes: ProjectTreeNodeDataRecordItem[],
): number => {
  return nodes.findLastIndex((node) => node.type === 'folder');
};

export const Header = () => {
  const { token } = theme.useToken();

  const projectTreeTimeLineVisible = useAppSelector(
    (state) => state.layout.projectTreeTimeLineVisible,
  );
  const selectedProjectStructureTreeNodes = useAppSelector(
    (state) => state.projectTree.所有已经选中的节点,
  );
  const projectStructureTreeData = useAppSelector(
    (state) => state.projectTree.项目节点树,
  );
  const projectTreeDataRecord = useAppSelector(
    (state) => state.projectTree.树节点key到节点数据的映射,
  );
  const nodeParentKeyRecord = useAppSelector(
    (state) => state.projectTree.节点到父节点的映射,
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
      在指定节点下插入新节点并同步更新其他数据({
        parentKey: target.key,
        node: {
          key: newKey,
        },
        index: 0,
        recordItem: {
          title: '',
          id: -1,
          type: 'folder',
        },
      }),
    );
  };

  const 在指定节点下插入新文件 = (target: ProjectStructureTreeDataNode) => {
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
      在指定节点下插入新节点并同步更新其他数据({
        parentKey: target.key,
        node: {
          isLeaf: true,
          key: newKey,
        },
        index: folderIndex + 1,
        recordItem: {
          title: '',
          id: -1,
          type: 'file',
        },
      }),
    );
  };

  const 在根节点下插入新文件 = () => {
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
      在指定节点下插入新节点并同步更新其他数据({
        parentKey: null,
        node: {
          key: newKey,
          isLeaf: true,
        },
        index: folderIndex + 1,
        recordItem: {
          title: '',
          type: 'file',
          id: -1,
        },
      }),
    );
  };

  const 在根节点下面插入新文件夹 = () => {
    const newKey = Math.random() + '';
    dispatch(
      在指定节点下插入新节点并同步更新其他数据({
        parentKey: null,
        node: {
          key: newKey,
        },
        index: 0,
        recordItem: {
          id: -1,
          type: 'folder',
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

  const handleProjectFileCreateBtnClick = async () => {
    if (!selectedKey) {
      在根节点下插入新文件();
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
        在指定节点下插入新文件(selectedNode);
      }
    } else if (节点是不是文件(selectedRecordItem)) {
      const parentKey = nodeParentKeyRecord[selectedKey];

      if (parentKey) {
        const parent = 查询项目树中的节点(
          reduxStore.getState().projectTree,
          parentKey,
        );
        if (parent) {
          在指定节点下插入新文件(parent);
        }
      } else {
        在根节点下插入新文件();
      }
    }
  };

  return (
    <Flex
      justify="end"
      style={{
        padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Space>
        <Button
          type="text"
          // loading={addFileLoading}
          icon={<HistoryOutlined />}
          onClick={() => {
            dispatch(showProjectTreeTimeLineAction());
          }}
        ></Button>
        <Button
          data-test-id={TEST_IDS.CREATE_PROJECT_NODE_BTN}
          type="text"
          disabled={projectTreeTimeLineVisible}
          // loading={addFileLoading}
          icon={<FileAddOutlined />}
          onClick={handleProjectFileCreateBtnClick}
        ></Button>
        <Button
          type="text"
          data-test-id={TEST_IDS.CREATE_PROJECT_GROUP_NODE_BTN}
          disabled={projectTreeTimeLineVisible}
          // loading={addFolderLoading}
          icon={<FolderAddOutlined />}
          onClick={处理项目组新建按钮点击事件}
        ></Button>
      </Space>
    </Flex>
  );
};
