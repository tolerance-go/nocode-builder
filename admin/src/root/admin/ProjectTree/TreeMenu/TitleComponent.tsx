import { Input } from "antd";

export const TitleComponent = ({
  title,
  isEditing,
  onFinish,
  newKey,
}: {
  title: string;
  isEditing?: boolean;
  onFinish: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
    key: React.Key,
  ) => void;
  newKey: React.Key;
}) => {
  return isEditing ? (
    <Input
      autoFocus
      defaultValue={title}
      onBlur={(e) => onFinish(e, newKey)}
      onPressEnter={(e) => onFinish(e, newKey)}
      style={{ width: "100%" }}
    />
  ) : (
    <span>{title}</span>
  );
};
