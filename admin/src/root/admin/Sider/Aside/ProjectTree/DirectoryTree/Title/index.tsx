import { projectTreeStore } from "@/stores";
import { projectTreeHistoryState } from "@/stores/projectTree";
import { Dropdown, Flex, InputRef, Typography, theme } from "antd";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { AutoSelectInput } from "./AutoSelectInput";

export const Title = ({
  title,
  nodeKey,
}: {
  nodeKey: string;
  title: string;
}) => {
  const inputRef = useRef<InputRef>(null);
  const { token } = theme.useToken();
  const projectTreeNodeEditingState = useSnapshot(
    projectTreeStore.projectTreeNodeEditingState,
  );

  const isEditing = projectTreeNodeEditingState.has(nodeKey);
  const saveNode = () => {
    const currentValue = inputRef.current?.input?.value.trim();
    projectTreeStore.saveNodeAction(nodeKey, currentValue ?? "");
  };

  return isEditing ? (
    <AutoSelectInput
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={title}
      onBlur={() => {
        const currentValue = inputRef.current?.input?.value.trim();
        if (currentValue) {
          saveNode();
          return;
        }

        projectTreeStore.removeNodeAction(nodeKey);

        projectTreeHistoryState.remove(
          projectTreeHistoryState.historyNodeCount - 1,
        );

        projectTreeStore.stopNodeEditingAction(nodeKey);
      }}
      onPressEnter={() => saveNode()}
      style={{ width: "100%" }}
    />
  ) : (
    <Dropdown
      trigger={["contextMenu"]}
      menu={{
        style: {
          width: token.sizeXXL * 5,
        },
        items: [
          {
            key: "edit",
            label: (
              <Flex justify="space-between" align="center">
                重命名...
                <Typography.Text keyboard>F2</Typography.Text>
              </Flex>
            ),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              projectTreeStore.startNodeEditingAction(nodeKey);
            },
          },
          {
            key: "delete",
            label: (
              <Flex justify="space-between" align="center">
                删除
                <Typography.Text keyboard>Delete/Backspace</Typography.Text>
              </Flex>
            ),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              projectTreeStore.removeItemAction(nodeKey);
            },
          },
        ],
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "100%",
        }}
      >
        {title}
      </span>
    </Dropdown>
  );
};
