import React, { useRef } from "react";
import { projectTreeStore } from "@/stores";
import { Input, InputRef } from "antd";

export const Title = ({
  title,
  isEditing,
  nodeKey,
}: {
  nodeKey: string;
  title: string;
  isEditing?: boolean;
}) => {
  const inputRef = useRef<InputRef>(null);

  const onFinish = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    const currentValue = inputRef.current?.input?.value;
    projectTreeStore.saveNodeAction(nodeKey, currentValue ?? "");
  };

  return isEditing ? (
    <Input
      ref={inputRef}
      autoFocus
      defaultValue={title}
      onBlur={(e) => onFinish(e)}
      onPressEnter={(e) => onFinish(e)}
      style={{ width: "100%" }}
    />
  ) : (
    <span>{title}</span>
  );
};
