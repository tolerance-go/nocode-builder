import {
  insertProjectStructureTreeNodeWithCheck,
  reduxStore,
  showProjectTreeTimeLineAction,
  updateEditingProjectStructureTreeNode,
  updateProjectStructureTreeTempNode,
  useAppDispatch,
  useAppSelector,
} from '@/core/managers/UIStoreManager';
import { findProjectStructureTreeNode } from '@/core/managers/UIStoreManager/store/utils';
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from '@/types';
import { nodeIsFile, nodeIsFolder } from '@/utils';
import {
  FileAddOutlined,
  FolderAddOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { TEST_IDS } from '@cypress/shared/constants';
import { Button, Flex, Space, theme } from 'antd';

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const findLastFolderIndex = (
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
    (state) => state.projectTree.selectedProjectStructureTreeNodes,
  );
  const projectStructureTreeData = useAppSelector(
    (state) => state.projectTree.projectStructureTreeData,
  );
  const projectTreeDataRecord = useAppSelector(
    (state) => state.projectTree.projectTreeDataRecord,
  );
  const nodeParentKeyRecord = useAppSelector(
    (state) => state.projectTree.nodeParentKeyRecord,
  );
  const dispatch = useAppDispatch();

  const selectedKey = selectedProjectStructureTreeNodes.length
    ? selectedProjectStructureTreeNodes[
        selectedProjectStructureTreeNodes.length - 1
      ]
    : null;

  /**
   * 处理点击添加文件夹的回调函数
   * @param event - 事件对象
   */
  const handleProjectGroupFolderCreateBtnClick = async () => {
    const insertInRoot = () => {
      const newKey = Math.random() + '';

      dispatch(
        insertProjectStructureTreeNodeWithCheck({
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
      dispatch(updateEditingProjectStructureTreeNode(newKey));
      dispatch(updateProjectStructureTreeTempNode(newKey));
    };

    const insert = (target: ProjectStructureTreeDataNode) => {
      const newKey = Math.random() + '';
      dispatch(
        insertProjectStructureTreeNodeWithCheck({
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
      dispatch(updateEditingProjectStructureTreeNode(newKey));
      dispatch(updateProjectStructureTreeTempNode(newKey));
    };

    if (!selectedKey) {
      insertInRoot();
      return;
    }

    const selectedRecordItem = projectTreeDataRecord[selectedKey];
    const selectedNode = findProjectStructureTreeNode(
      reduxStore.getState().projectTree,
      selectedKey,
    );

    if (!selectedRecordItem) {
      throw new Error('数据不完整。');
    }

    if (nodeIsFolder(selectedRecordItem)) {
      if (selectedNode) {
        insert(selectedNode);
      }
    } else if (nodeIsFile(selectedRecordItem)) {
      const parentKey = nodeParentKeyRecord[selectedKey];
      if (parentKey) {
        const parent = findProjectStructureTreeNode(
          reduxStore.getState().projectTree,
          parentKey,
        );
        if (parent) {
          insert(parent);
        }
      } else {
        insertInRoot();
      }
    }
  };

  const handleProjectFileCreateBtnClick = async () => {
    const insertInRoot = () => {
      const folderIndex = findLastFolderIndex(
        projectStructureTreeData.map((node) => {
          const recordItem = projectTreeDataRecord[node.key];
          if (!recordItem) {
            throw new Error('数据不完整。');
          }
          return recordItem;
        }),
      );

      console.log('folderIndex', folderIndex);

      const newKey = Math.random() + '';

      dispatch(
        insertProjectStructureTreeNodeWithCheck({
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
      dispatch(updateEditingProjectStructureTreeNode(newKey));
      dispatch(updateProjectStructureTreeTempNode(newKey));
    };

    const insert = (target: ProjectStructureTreeDataNode) => {
      const folderIndex = findLastFolderIndex(
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
        insertProjectStructureTreeNodeWithCheck({
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
      dispatch(updateEditingProjectStructureTreeNode(newKey));
      dispatch(updateProjectStructureTreeTempNode(newKey));
    };

    if (!selectedKey) {
      insertInRoot();
      return;
    }

    const selectedRecordItem = projectTreeDataRecord[selectedKey];
    const selectedNode = findProjectStructureTreeNode(
      reduxStore.getState().projectTree,
      selectedKey,
    );

    if (!selectedRecordItem) {
      throw new Error('数据不完整。');
    }

    if (nodeIsFolder(selectedRecordItem)) {
      if (selectedNode) {
        insert(selectedNode);
      }
    } else if (nodeIsFile(selectedRecordItem)) {
      const parentKey = nodeParentKeyRecord[selectedKey];

      if (parentKey) {
        const parent = findProjectStructureTreeNode(
          reduxStore.getState().projectTree,
          parentKey,
        );
        if (parent) {
          insert(parent);
        }
      } else {
        insertInRoot();
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
          onClick={handleProjectGroupFolderCreateBtnClick}
        ></Button>
      </Space>
    </Flex>
  );
};
