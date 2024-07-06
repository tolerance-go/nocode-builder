import { 测试标识 } from '@cypress/shared/constants';
import { Avatar, Button, Dropdown, Flex, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Flex
      style={{
        height: '100%',
        padding: `${token.paddingSM}px ${token.paddingXS}px`,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
      }}
      justify="center"
      align="end"
    >
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: <span data-test-id={测试标识.登出按钮文本}>登出</span>,
              onClick: () => {
                navigate('/login');
              },
            },
          ],
        }}
        placement="topRight"
      >
        <Button
          type="text"
          shape="circle"
          icon={<Avatar data-test-id={测试标识.用户头像} />}
        ></Button>
      </Dropdown>
    </Flex>
  );
};
