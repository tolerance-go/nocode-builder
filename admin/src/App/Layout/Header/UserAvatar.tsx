import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "设置",
  },
  {
    key: "2",
    label: "主题",
  },
  {
    key: "3",
    label: "登出",
  },
];

export const UserAvatar = () => {
  return (
    <Dropdown menu={{ items }}>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        <DownOutlined className="text-black text-xs" />
      </Space>
    </Dropdown>
  );
};
