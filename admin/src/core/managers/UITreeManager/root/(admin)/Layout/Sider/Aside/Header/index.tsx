import { useAppStore } from '@/core/managers/UIStoreManager';
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
import { Button, Flex, Space, theme } from 'antd';

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const findLastFolderIndex = (
  nodes: ProjectTreeNodeDataRecordItem[],
): number => {
  return nodes.findLastIndex((node) => node.type === 'folder');
};

export const Header = () => {
  const { token } = theme.useToken();
  const insertProjectStructureTreeNodeWithCheck =
    useAppStore.use.insertProjectStructureTreeNodeWithCheck();
  const showProjectTreeTimeLineAction =
    useAppStore.use.showProjectTreeTimeLineAction();
  const projectTreeTimeLineVisible =
    useAppStore.use.projectTreeTimeLineVisible();
  const projectStructureTreeData = useAppStore.use.projectStructureTreeData();
  const projectTreeDataRecord = useAppStore.use.projectTreeDataRecord();
  const updateEditingProjectStructureTreeNode =
    useAppStore.use.updateEditingProjectStructureTreeNode();
  const selectedProjectStructureTreeNodes =
    useAppStore.use.selectedProjectStructureTreeNodes();
  const findProjectStructureTreeNode =
    useAppStore.use.findProjectStructureTreeNode();
  const updateProjectStructureTreeTempNode =
    useAppStore.use.updateProjectStructureTreeTempNode();

  const nodeParentKeyRecord = useAppStore.use.nodeParentKeyRecord();

  const selectedKey = selectedProjectStructureTreeNodes.length
    ? selectedProjectStructureTreeNodes[
        selectedProjectStructureTreeNodes.length - 1
      ]
    : null;

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
            showProjectTreeTimeLineAction();
          }}
        ></Button>
        <Button
          type="text"
          disabled={projectTreeTimeLineVisible}
          // loading={addFileLoading}
          icon={<FileAddOutlined />}
          onClick={async () => {
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

              insertProjectStructureTreeNodeWithCheck(
                null,
                {
                  key: newKey,
                  isLeaf: true,
                },
                folderIndex,
                {
                  title: '',
                  type: 'file',
                  id: -1,
                },
              );
              updateEditingProjectStructureTreeNode(newKey);
              updateProjectStructureTreeTempNode(newKey);
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

              insertProjectStructureTreeNodeWithCheck(
                target.key,
                {
                  isLeaf: true,
                  key: newKey,
                },
                folderIndex,
                {
                  title: '',
                  id: -1,
                  type: 'file',
                },
              );
              updateEditingProjectStructureTreeNode(newKey);
              updateProjectStructureTreeTempNode(newKey);
            };

            if (!selectedKey) {
              insertInRoot();
              return;
            }

            const selectedRecordItem = projectTreeDataRecord[selectedKey];
            const selectedNode = findProjectStructureTreeNode(selectedKey);

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
                const parent = findProjectStructureTreeNode(parentKey);
                if (parent) {
                  insert(parent);
                }
              } else {
                insertInRoot();
              }
            }
          }}
        ></Button>
        <Button
          type="text"
          disabled={projectTreeTimeLineVisible}
          // loading={addFolderLoading}
          icon={<FolderAddOutlined />}
          onClick={async () => {
            const insertInRoot = () => {
              const newKey = Math.random() + '';
              insertProjectStructureTreeNodeWithCheck(
                null,
                {
                  key: newKey,
                },
                -1,
                {
                  id: -1,
                  type: 'folder',
                  title: '',
                },
              );
              updateEditingProjectStructureTreeNode(newKey);
              updateProjectStructureTreeTempNode(newKey);
            };

            const insert = (target: ProjectStructureTreeDataNode) => {
              const newKey = Math.random() + '';
              insertProjectStructureTreeNodeWithCheck(
                target.key,
                {
                  key: newKey,
                },
                -1,
                {
                  title: '',
                  id: -1,
                  type: 'folder',
                },
              );
              updateEditingProjectStructureTreeNode(newKey);
              updateProjectStructureTreeTempNode(newKey);
            };

            if (!selectedKey) {
              insertInRoot();
              return;
            }

            const selectedRecordItem = projectTreeDataRecord[selectedKey];
            const selectedNode = findProjectStructureTreeNode(selectedKey);

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
                const parent = findProjectStructureTreeNode(parentKey);
                if (parent) {
                  insert(parent);
                }
              } else {
                insertInRoot();
              }
            }
          }}
        ></Button>
      </Space>
    </Flex>
  );
};
