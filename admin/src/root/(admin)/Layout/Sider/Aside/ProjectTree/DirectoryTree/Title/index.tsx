import { projectTreeStore } from "@/stores";
import {
  projectTreeHistoryState,
  projectTreeTempNodeState,
} from "@/stores/projectTree";
import { Dropdown, Flex, InputRef, Typography, theme } from "antd";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import { AutoSelectInput } from "./AutoSelectInput";

export const Title = ({ nodeKey }: { nodeKey: string }) => {
  const inputRef = useRef<InputRef>(null);
  const { token } = theme.useToken();
  const projectTreeNodeEditingState = useSnapshot(
    projectTreeStore.projectTreeNodeEditingState,
  );
  const title = "";

  const isEditing = projectTreeNodeEditingState.has(nodeKey);

  const saveNode = (currentValue: string) => {
    if (projectTreeTempNodeState.has(nodeKey)) {
      projectTreeStore.saveNodeWithReplaceHistoryAction(nodeKey, currentValue);
      projectTreeTempNodeState.delete(nodeKey);
    } else {
      projectTreeStore.saveNodeAction(nodeKey, currentValue);
    }
  };

  const saveInput = () => {
    const currentValue = inputRef.current?.input?.value.trim();
    if (currentValue) {
      saveNode(currentValue);
      return;
    }

    /** 不合法的输入时 */

    // 如果是临时新建的
    if (projectTreeTempNodeState.has(nodeKey)) {
      // 删除
      projectTreeStore.removeNodeAction(nodeKey);

      projectTreeHistoryState.remove(
        projectTreeHistoryState.historyNodeCount - 1,
      );
    }

    // 否则结束编辑
    projectTreeStore.stopNodeEditingAction(nodeKey);
  };

  return isEditing ? (
    <AutoSelectInput
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={title}
      onBlur={() => saveInput()}
      onPressEnter={() => saveInput()}
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
