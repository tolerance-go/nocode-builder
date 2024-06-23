import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const UserAvatar = () => {
  const nav = useNavigate();

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
      onClick: () => {
        nav("/login");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        <DownOutlined className="text-black text-xs" />
      </Space>
    </Dropdown>
  );
};
