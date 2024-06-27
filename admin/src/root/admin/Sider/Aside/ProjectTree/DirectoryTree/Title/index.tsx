import { projectTreeStore } from "@/stores";
import { Dropdown, Flex, InputRef, Typography, theme } from "antd";
import React, { useRef } from "react";
import { AutoSelectInput } from "./AutoSelectInput";
import { useSnapshot } from "valtio";

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
  const onFinish = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    const currentValue = inputRef.current?.input?.value.trim();
    projectTreeStore.saveNodeAction(nodeKey, currentValue ?? "");
  };

  return isEditing ? (
    <AutoSelectInput
      size="small"
      ref={inputRef}
      autoFocus
      defaultValue={title}
      onBlur={(e) => onFinish(e)}
      onPressEnter={(e) => onFinish(e)}
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
