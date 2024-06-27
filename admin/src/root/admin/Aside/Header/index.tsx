import { projectTreeStore } from "@/stores";
import { nodeIsFolder } from "@/stores/_utils/is";
import { ProjectTreeDataNode } from "@/types";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";

/** 找到节点数组中从前到后顺序的第一个文件夹的位置 */
const findLastFolderIndex = (nodes: ProjectTreeDataNode[]): number => {
  return nodes.findLastIndex((node) => node.type === "folder");
};

export const Header = () => {
  // const { addFolderLoading, addFileLoading } = useSnapshot(treeStore);
  const { token } = theme.useToken();
  return (
    <Flex
      justify="end"
      style={{
        padding: `${token.sizeXXS}px ${token.sizeXS}px`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Button
        type="text"
        // loading={addFileLoading}
        icon={<FileAddOutlined />}
        onClick={async () => {
          const selectedKey = projectTreeStore.projectTreeState.selectedKey;
          if (!selectedKey) return;

          const selectedNode =
            projectTreeStore.findNodeByKeyOrThrow(selectedKey);

          if (nodeIsFolder(selectedNode)) {
            const folderIndex = findLastFolderIndex(
              selectedNode.children ?? [],
            );

            console.log("folderIndex", folderIndex);

            projectTreeStore.insertChildNodeAction(
              selectedKey,
              {
                title: "",
                key: Math.random() + "",
                id: -1,
                type: "file",
                isEditing: true,
                isLeaf: true,
              },
              folderIndex,
            );
          }
        }}
      ></Button>
      <Button
        type="text"
        // loading={addFolderLoading}
        icon={<FolderAddOutlined />}
        onClick={async () => {
          const selectedKey = projectTreeStore.projectTreeState.selectedKey;
          if (!selectedKey) return;

          const selectedNode =
            projectTreeStore.findNodeByKeyOrThrow(selectedKey);

          if (nodeIsFolder(selectedNode)) {
            projectTreeStore.insertChildNodeAction(
              selectedKey,
              {
                title: "",
                key: Math.random() + "",
                id: -1,
                type: "folder",
                isEditing: true,
              },
              -1,
            );
          }
        }}
      ></Button>
    </Flex>
  );
};
