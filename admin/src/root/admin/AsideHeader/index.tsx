import { projectsStore } from "@/store/projects";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";
import { useSnapshot } from "valtio";

export const AsideHeader = () => {
  const { addFolderLoading, addFileLoading } = useSnapshot(
    projectsStore.states,
  );
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
          projectsStore.actions.addFile();
        }}
      ></Button>
      <Button
        type="text"
        loading={addFolderLoading}
        icon={<FolderAddOutlined />}
        onClick={async () => {
          projectsStore.actions.addFolder();
        }}
      ></Button>
    </Flex>
  );
};
