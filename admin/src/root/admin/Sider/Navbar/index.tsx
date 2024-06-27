import { Avatar, Button, Dropdown, Flex, theme } from "antd";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Flex
      style={{
        height: '100%',
        padding: `${token.sizeSM}px ${token.sizeXS}px`,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
      }}
      justify="center"
      align="end"
    >
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: "登出",
              onClick: () => {
                navigate("/login");
              },
            },
          ],
        }}
        placement="topRight"
      >
        <Button type="text" shape="circle" icon={<Avatar />}></Button>
      </Dropdown>
    </Flex>
  );
};
