import { EllipsisOutlined } from '@ant-design/icons';
import { 测试标识 } from '@cypress/shared/constants';
import { Avatar, Button, Dropdown, Flex, Space, theme, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const UserBar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Flex
      style={{
        padding: `${token.paddingXXS}px ${token.paddingXXS}px`,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
      justify="space-between"
      align="center"
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
          style={{
            padding: `${token.paddingSM}px ${token.paddingXS}px`,
          }}
        >
          <Space>
            <Avatar size="small" data-test-id={测试标识.用户头像}></Avatar>
            <Typography.Text>yb</Typography.Text>
          </Space>
        </Button>
      </Dropdown>
      <Button type="text" icon={<EllipsisOutlined />}></Button>
    </Flex>
  );
};
