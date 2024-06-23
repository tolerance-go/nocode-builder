import { PlusOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

export const AddBtn = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      type="text"
      size="small"
      className="group"
      icon={
        <PlusOutlined className="text-gray-400 group-hover:text-gray-900 transition-colors" />
      }
    ></Button>
  );
};
