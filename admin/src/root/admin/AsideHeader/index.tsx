import store from "@/store";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";
import { useSnapshot } from "valtio";

export const AsideHeader = () => {
  const { addFolderLoading, addFileLoading } = useSnapshot(
    store.projects.states,
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
          store.projects.actions.addFile();
        }}
      ></Button>
      <Button
        type="text"
        loading={addFolderLoading}
        icon={<FolderAddOutlined />}
        onClick={async () => {
          store.projects.actions.addFolder();
        }}
      ></Button>
    </Flex>
  );
};
