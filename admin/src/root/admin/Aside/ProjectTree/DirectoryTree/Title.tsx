import { projectTreeStore } from "@/stores";
import { InputRef } from "antd";
import React, { useRef } from "react";
import { AutoSelectInput } from "./AutoSelectInput";

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
    const currentValue = inputRef.current?.input?.value.trim();
    projectTreeStore.saveNodeAction(nodeKey, currentValue ?? "");
  };

  return isEditing ? (
    <AutoSelectInput
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
