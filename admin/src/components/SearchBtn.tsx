import { SearchOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";

export const SearchBtn = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      type="text"
      className="group"
      size="small"
      icon={
        <SearchOutlined className="text-gray-400 group-hover:text-gray-900 transition-colors" />
      }
    />
  );
};
