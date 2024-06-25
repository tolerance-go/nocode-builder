import stores from "@/stores";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";
import { RefObject } from "react";
import { useSnapshot } from "valtio";
import { TreeMenuRef } from "../ProjectTree/TreeMenu";

export const AsideHeader = ({
  treeMenuRef,
}: {
  treeMenuRef: RefObject<TreeMenuRef>;
}) => {
  const addFileLoading = useSnapshot(stores.projects.states.addFileLoading);
  const addFolderLoading = useSnapshot(stores.projects.states.addFolderLoading);
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
        loading={addFileLoading.loading}
        icon={<FileAddOutlined />}
        onClick={async () => {
          treeMenuRef.current?.addFile();
        }}
      ></Button>
      <Button
        type="text"
        loading={addFolderLoading.loading}
        icon={<FolderAddOutlined />}
        onClick={async () => {
          treeMenuRef.current?.addFolder();
        }}
      ></Button>
    </Flex>
  );
};
