import { Input } from "antd";

export const Title = ({
  title,
  isEditing,
}: {
  title: string;
  isEditing?: boolean;
}) => {
  const onFinish = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {};

  return isEditing ? (
    <Input
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
