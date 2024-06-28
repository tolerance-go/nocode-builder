import { useAppStore } from "@/store";
import { layoutStore, projectTreeStore } from "@/stores";
import { nodeIsFile, nodeIsFolder } from "@/stores/_utils/is";
import {
  insertNodeAction,
  projectTreeState,
  projectTreeTempNodeState,
} from "@/stores/projectTree";
import {
  ProjectStructureTreeDataNode,
  ProjectTreeNodeDataRecordItem,
} from "@/types";
import {
  FileAddOutlined,
  FolderAddOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Button, Flex, Space, theme } from "antd";
import { useSnapshot } from "valtio";

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const findLastFolderIndex = (
  nodes: ProjectTreeNodeDataRecordItem[],
): number => {
  return nodes.findLastIndex((node) => node.type === "folder");
};

export const Header = () => {
  const layoutState = useSnapshot(layoutStore.layoutState);
  const { token } = theme.useToken();
  const insertProjectStructureTreeNode =
    useAppStore.use.insertProjectStructureTreeNode();

  const projectStructureTreeData = useAppStore.use.projectStructureTreeData();
  const projectTreeDataRecord = useAppStore.use.projectTreeDataRecord();
  const updateEditingProjectStructureTreeNode =
    useAppStore.use.updateEditingProjectStructureTreeNode();

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
            layoutStore.showProjectTreeTimeLineAction();
          }}
        ></Button>
        <Button
          type="text"
          disabled={layoutState.projectTreeTimeLineVisible}
          // loading={addFileLoading}
          icon={<FileAddOutlined />}
          onClick={async () => {
            const insertInRoot = () => {
              const folderIndex = findLastFolderIndex(
                projectStructureTreeData.map(
                  (node) => projectTreeDataRecord[node.key],
                ),
              );

              const newKey = Math.random() + "";

              insertProjectStructureTreeNode(
                null,
                {
                  key: newKey,
                  isLeaf: true,
                },
                folderIndex,
                {
                  title: "",
                  type: "file",
                  id: -1,
                },
              );
              updateEditingProjectStructureTreeNode(newKey);
              projectTreeTempNodeState.add(newKey);
            };

            const insert = (target: ProjectStructureTreeDataNode) => {
              const folderIndex = findLastFolderIndex(target.children ?? []);
              const newKey = Math.random() + "";

              projectTreeStore.insertChildNodeAction(
                target.key,
                {
                  title: "",
                  key: newKey,
                  id: -1,
                  type: "file",
                  isLeaf: true,
                },
                folderIndex,
              );
              projectTreeStore.startNodeEditingAction(newKey);
              projectTreeTempNodeState.add(newKey);
            };

            const selectedKey = projectTreeStore.projectTreeState.selectedKey;
            if (!selectedKey) {
              insertInRoot();
              return;
            }

            const selectedNode =
              projectTreeStore.findNodeByKeyOrThrowAction(selectedKey);

            if (nodeIsFolder(selectedNode)) {
              insert(selectedNode);
            } else if (nodeIsFile(selectedNode)) {
              const parent =
                projectTreeStore.findParentNodeOrThrow(selectedKey);
              if (parent) {
                insert(parent);
              } else {
                insertInRoot();
              }
            }
          }}
        ></Button>
        <Button
          type="text"
          disabled={layoutState.projectTreeTimeLineVisible}
          // loading={addFolderLoading}
          icon={<FolderAddOutlined />}
          onClick={async () => {
            const selectedKey = projectTreeStore.projectTreeState.selectedKey;

            const insertInRoot = () => {
              const newKey = Math.random() + "";
              insertNodeAction(
                projectTreeState.treeData.value.data,
                {
                  title: "",
                  id: -1,
                  type: "folder",
                  key: newKey,
                },
                -1,
              );
              projectTreeStore.startNodeEditingAction(newKey);
              projectTreeTempNodeState.add(newKey);
            };

            const insert = (target: ProjectStructureTreeDataNode) => {
              const newKey = Math.random() + "";
              projectTreeStore.insertChildNodeAction(
                target.key,
                {
                  title: "",
                  id: -1,
                  type: "folder",
                  key: newKey,
                },
                -1,
              );
              projectTreeStore.startNodeEditingAction(newKey);
              projectTreeTempNodeState.add(newKey);
            };

            if (!selectedKey) {
              insertInRoot();
              return;
            }

            const selectedNode =
              projectTreeStore.findNodeByKeyOrThrowAction(selectedKey);

            if (nodeIsFolder(selectedNode)) {
              insert(selectedNode);
            } else if (nodeIsFile(selectedNode)) {
              const parent =
                projectTreeStore.findParentNodeOrThrow(selectedKey);
              if (parent) {
                insert(parent);
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
