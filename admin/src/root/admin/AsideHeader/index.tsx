import { projectActions } from "@/stores/project";
import { treeStore } from "@/stores/project/stores";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";
import { useSnapshot } from "valtio";

export const AsideHeader = () => {
  const { addFolderLoading, addFileLoading } = useSnapshot(treeStore);
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
        loading={addFileLoading}
        icon={<FileAddOutlined />}
        onClick={async () => {
          projectActions.addFileAction();
        }}
      ></Button>
      <Button
        type="text"
        loading={addFolderLoading}
        icon={<FolderAddOutlined />}
        onClick={async () => {
          projectActions.addFolderAction();
        }}
      ></Button>
    </Flex>
  );
};
